const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const authSchema=new Schema({
    
      fullName:{
        type:String,
        required:true,
        trim:true
    },
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
        minlength:[8,"Password must be atleast 8 characters long"]
    },

    lastLogin:{
        type:Date,
        default:null
    },
    emailVerified:{
        type:Boolean,
        default:false
    },
    emailVerificationToken:{
        type:String
    }

}, {timestamps:true})



module.exports=mongoose.model("Auth",authSchema);