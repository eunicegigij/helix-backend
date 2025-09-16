const {z} = require("zod");

const signUpBodySchema = z.object({
    email:z.string().z.email(),
    password:z.string().min(8).max(20),
    fullname:z.string().min(3).max(30)
});

module.exports={signUpBodySchema};