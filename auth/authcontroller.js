const Auth=require("./schema/auth");
const utils=require("../utils/utils");
const {sendVerification} =require("../utils/emailService");
const { signUpBodySchema } = require("./dto/signUp.dto");
const {authService}=require("./authService");

async function signUp(req,res) {
    try{
    const signData=signUpBodySchema.parse(req.body);
    const {email,password,fullname}=signData;
    const hash= await utils.hashPassword(password);
    const userAuth= authService.create({
        email,
        password:hash
    });
    
        console.log("User Auth has been created");


        res.status(201).json({
            status:true,
            message:"Registration successful",
            data:{}
        });

    }
    catch (err) {
         console.error("Error saving user",err.message);
         res.status(500).json({
            status:false,
            message:"Error Creating Account",
            error: err.message  
         })
    };

   
    
}; 

module.exports={signUp}