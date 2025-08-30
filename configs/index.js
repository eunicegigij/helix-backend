const dotenv=require("dotenv");
dotenv.config();

const dbURI=process.env.dbURI || "";
const EMAIL_USER=process.env.EMAIL_USER ||"";
const EMAIL_PASS=process.env.EMAIL_PASS ||"";

module.exports={dbURI,EMAIL_PASS,EMAIL_USER};