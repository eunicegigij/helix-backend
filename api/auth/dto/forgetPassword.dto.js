const { z } = require("zod");

const forgetPasswordSchema = z.object({
  email: z.string().email({ message: "email must be a valid email" }),
});

module.exports = { forgetPasswordSchema };
