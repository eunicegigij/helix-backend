const { z } = require("zod");

const resetPasswordSchema = z
  .object({
    token: z.string().min(1, { message: "token is required" }),
    newPassword: z
      .string()
      .min(8, { message: "password must be at least 8 characters" })
      .max(20, { message: "password cannot be more than 20 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "confirm password is required" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "passwords do not match",
    path: ["confirmPassword"],
  });

module.exports = { resetPasswordSchema };
