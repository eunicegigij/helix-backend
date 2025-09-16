const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const authSchema=new Schema({
    
     email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },

    password:{
        type:String,
        required:true,
    },

    lastLogin:{
        type:Date,
        default:null // should i leave this?
    },
    emailVerified:{
        type:Boolean,
        default:true // is this correct?
    },
    emailVerificationToken:{
        type:String
    }

}, {timestamps:true})



module.exports=mongoose.model("Auth",authSchema);