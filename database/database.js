const mongoose=require("mongoose");
const {dbURI}= require("../configs/index");

const connectDB= async ()=>{
    try{
        if (dbURI){
            await mongoose.connect(dbURI,{
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
