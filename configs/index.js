const dotenv=require("dotenv");
dotenv.config();

const dbURI=process.env.dbURI || "";

module.exports={dbURI};