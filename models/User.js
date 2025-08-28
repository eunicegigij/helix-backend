const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const bcrypt=require("bcryptjs");
const saltRounds=12;
const userSchema=new Schema({
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
        minlength:[8,"Password must be atleast 8 charaters long"]
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

}, {timestamps:true});

userSchema.pre("save", async function (next){
    try{
        if(this.isModified("password")){
            const salt= await bcrypt.genSalt(saltRounds);
            const hashedPassword= await bcrypt.hash(this.password,salt);
            this.password=hashedPassword;
        }
        next();
    } catch(err){
        next(err);
    }
});

userSchema.methods.comparePassword= function (pass){
   return bcrypt.compare(pass,this.password);
};
userSchema.methods.generateVerificationToken= function(lengthInBytes=32){
    const token=crypto.randomBytes(lengthInBytes).toString('hex');
    this.emailVerificationToken=token;
    return token;
};

module.exports = mongoose.model("User", userSchema);