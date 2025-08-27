const mongoose=require("mongoose");
const dotenv=require("dotenv");
dotenv.config();
const dbURI=process.env.dbURI;
mongoose.connect(dbURI)
    .then((result)=>{
        console.log("connected to database")
    })
    .catch((err)=>{
        console.log(err)
    });