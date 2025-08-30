const nodemailer=require("nodemailer");
const {EMAIL_USER}=require("../configs/index");
const {EMAIL_PASS}=require("../configs/index");
const fs=require("fs");
const path=require("path");
const htmlTemplate=path.join(__dirname,"..//templates/verificationEmail.html");


async function sendVerification(email,token){
    try{
        const transporter= nodemailer.createTransport({
            service: "gmail",
            auth:{
                user: EMAIL_USER,
                pass: EMAIL_PASS
            }
        });
        const read=fs.readFileSync(htmlTemplate,"utf8");
        const processedHTML=read.replace("{{VERIFICATION_TOKEN}}",token);
        const mailOptions={
            from: EMAIL_USER,
            to:email,
            subject:"Please verify your account",
            html:processedHTML,
            text: "Your verification token is: " + token
        };
        return await transporter.sendMail(mailOptions);
        }
    catch(err){
        console.log("Email sending failed");
        throw err;
    };
    
};

module.exports={sendVerification};