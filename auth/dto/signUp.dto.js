const { z } = require("zod");

const signUpBodySchema = z.object({
  email: z.email({ message: "email must be an email" }),
  password: z
    .string({ messsage: "password must be a string" })
    .min(8, { message: "password must be atleast 8 characters" })
    .max(20, { message: "password cannot be more than 20 characters" }),
  fullname: z
    .string({ message: "fullName must be a string" })
    .min(3, { message: "fullname must be atleast 3 characters" })
    .max(30, { message: "fullname cannot be more than 30 characters" }),
});

module.exports = { signUpBodySchema };
