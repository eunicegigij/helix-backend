const nodemailer = require("nodemailer");
const { ENV } = require("../configs/connection");
const fs = require("fs");
const path = require("path");
const htmlTemplate = path.join(__dirname, "../templates/verificationEmail.html");

async function sendVerification(email, token) {
    try {
        console.log("Attempting to send email to:", email);
        console.log("Email user:", ENV.EMAIL_USER);
        console.log("Email pass exists:", !!ENV.EMAIL_PASS);
        
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: ENV.EMAIL_USER,
                pass: ENV.EMAIL_PASS
            }
        });

        // Test the connection
        await transporter.verify();
        console.log("SMTP connection verified successfully");

        const read = fs.readFileSync(htmlTemplate, "utf8");
        const processedHTML = read
            .replace("{{VERIFICATION_TOKEN}}", token)
            .replace('id="tokenDisplay"', `id="tokenDisplay" data-token="${token}"`);
        
        const mailOptions = {
            from: ENV.EMAIL_USER,
            to: email,
            subject: "Please verify your account - HELIX",
            html: processedHTML,
            text: "Your verification token is: " + token
        };

        const result = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully:", result.messageId);
        return result;
        
    } catch (err) {
        console.error("Detailed email error:", err);
        throw err;
    }
}

module.exports = { sendVerification };