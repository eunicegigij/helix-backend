const dotenv=require("dotenv");
const { default: mongoose } = require("mongoose");
dotenv.config();

const ENV= {
    dbURI:process.env.dbURI || "",
    EMAIL_USER:process.env.EMAIL_USER ||"",
    EMAIL_PASS:process.env.EMAIL_PASS ||""
};
module.exports={ENV};