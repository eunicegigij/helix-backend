const mongoose=require("mongoose");
const dotenv=require("dotenv");
dotenv.config();

const connectDB= async ()=>{
    try{
        await mongoose.connect(process.env.dbURI);
        console.log("Connected to database successfully");
    } catch(err){
        console.log(err,"Database connection failed");
        process.exit(1);
    }
};

connectDB();
