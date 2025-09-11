const mongoose=require("mongoose");
const {ENV}= require("../configs/connection");

const connectDB= async ()=>{
    try{
        if (ENV.dbURI){
            await mongoose.connect(ENV.dbURI,{
                useNewUrlParser:true,
                useUnifiedTopology:true
            });
            console.log("Connected to database successfully");
        }
        else{
            console.log("dbURI is missing!");
        };
    } catch(err){
        console.error("Database connection failed:",err.message);
        process.exit(1);
    };
};


module.exports=connectDB;
