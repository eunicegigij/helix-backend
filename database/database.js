const mongoose=require("mongoose");
const {ENV}= require("../configs/connection");

const connectDB= async ()=>{

    mongoose.connect(ENV.dbURI,
        {
           useNewUrlParser:true,
           useUnifiedTopology:true 
        }

    );
    mongoose.connection.on('connected', ()=>{
        console.log('connection successful');  
    });

    mongoose.connection.on("error" , (error)=>{
        console.log("Database connection failed: ",error.message);
        console.log(error);
        process.exit(1);
    });
};




module.exports=connectDB;
