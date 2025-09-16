const auth = require("./schema/auth");

const authService = {
   create : async function createAuth({email,password}) {
        const newAuth = auth.create({email,password});
        (await newAuth).save();
        return newAuth;
    }
};

module.exports={authService};