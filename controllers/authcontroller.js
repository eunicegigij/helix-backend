const Auth=require("../models/auth");
const utils=require("../utils/utils");
const {sendVerification} =require("../utils/emailService");

async function signUp(req,res) {
    const {fullname,email,password}=req.body;
    const hash= await utils.hashPassword(password);
    const newUser= new Auth({
        fullName: fullname,
        email:email,
        password:hash
    });
    const theToken=utils.generateToken();
    newUser.emailVerificationToken=token;
    try{
        const savedUser= await newUser.save();
        console.log("Your Account has been successfully created");
        res.status(201).json({
            message:"Registration successful, please check your email to verify your account",
        });
    }
    catch (err) {
         console.error("Error saving user",err.message);
         res.status(500).json({
            message:"Error Creating Account",
            error: err.message
         })
    };

    const send=sendVerification();
    
}; 

