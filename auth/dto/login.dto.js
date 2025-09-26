const { z } = require("zod");

const loginBodySchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

module.exports = { loginBodySchema };
