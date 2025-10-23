const { z } = require("zod");
const { ROLES } = require("../../constants/constant");

const updateUserBodySchema = z.object({
  availability: z
    .array(z.string())
    .min(1, { message: "at least one day is required" })
    .optional(),

  timezone: z.string().min(2, { message: "timezone is required" }).optional(),

  location: z.string().min(3, { message: "location is required" }).optional(),

  bio: z
    .string()
    .min(10, { message: "bio must be at least 10 characters" })
    .max(500, { message: "bio cannot be more than 500 characters" })
    .optional(),

  yearsOfExperience: z
    .string()
    .min(1, { message: "years of experience is required" })
    .optional(),

  educationalBackground: z
    .string()
    .min(1, { message: "educational background is required" })
    .optional(),

  industry: z.string().min(1, { message: "industry is required" }).optional(),

  skills: z
    .array(z.string())
    .min(1, { message: "at least one skill is required" })
    .optional(),

  linkedinProfile: z
    .string()
    .url({ message: "linkedinProfile must be a valid URL" })
    .optional(),

  learningGoals: z
    .string()
    .min(10, { message: "learning goals must be at least 10 characters" })
    .optional(),

  currentJobTitle: z
    .string()
    .min(1, { message: "current job title is required" })
    .optional(),

  mentorshipGoals: z
    .string()
    .min(10, { message: "mentorship goals must be at least 10 characters" })
    .optional(),

  portfolio: z
    .string()
    .url({ message: "portfolio must be a valid URL" })
    .optional(),

  company: z.string().optional(),
});

module.exports = { updateUserBodySchema };
