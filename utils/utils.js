const crypto=require("crypto");
const bcrypt=require("bcryptjs");

const saltRounds=12;

async function hashPassword (password){
    try{
       const salt=await bcrypt.genSalt(saltRounds);
       return await bcrypt.hash(password,salt);
    }
    catch(err){
        console.log("Password could not be generated",err);
        throw(err);
    };
   
};

async function compare (password,hashedPassword){
    return await bcrypt.compare(password,hashedPassword);
};

function generateToken (lengthInBytes=32){
    return crypto.randomBytes(lengthInBytes).toString('hex');
};

module.exports={
    hashPassword,
    compare,
    generateToken
};
