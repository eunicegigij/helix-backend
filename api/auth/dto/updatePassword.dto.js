const { z } = require("zod");

const updatePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: "current password is required" }),
    newPassword: z
      .string()
      .min(8, { message: "new password must be at least 8 characters" })
      .max(20, { message: "new password cannot be more than 20 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "confirm password is required" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "passwords do not match",
    path: ["confirmPassword"],
  });

module.exports = { updatePasswordSchema };
