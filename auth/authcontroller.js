const Auth=require("./auth");
const utils=require("../utils/utils");
const {sendVerification} =require("../utils/emailService");

async function signUp(req,res) {
    const {email,password}=req.body;
    const hash= await utils.hashPassword(password);
    const newUser= new Auth({
        email:email,
        password:hash
    });
    const theToken=utils.generateToken();
    newUser.emailVerificationToken=theToken;
    
    try{
        const savedUser= await newUser.save();
        console.log("Your Account has been successfully created");
        
        console.log("About to call sendVerification with:", savedUser.email, theToken);
        await sendVerification(savedUser.email,theToken);
        console.log("sendVerification called");

        res.status(201).json({
            message:"Registration successful",
        });

    }
    catch (err) {
         console.error("Error saving user",err.message);
         res.status(500).json({
            message:"Error Creating Account",
            error: err.message  
         })
    };

   
    
}; 

module.exports={signUp}