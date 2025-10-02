const { z } = require("zod");
const { ROLES } = require("../../constants/constant");

const updateUserBodySchema = z.object({
  role: z.enum(Object.values(ROLES), {
    message: "role must be either mentor or mentee",
  }),

  availability: z.object({
    startTime: z.string().min(1, { message: "start time is required" }),
    endTime: z.string().min(1, { message: "end time is required" }),
  }),

  timezone: z.string().min(2, { message: "timezone is required" }),

  location: z.string().min(3, { message: "location is required" }),

  bio: z
    .string()
    .min(10, { message: "bio must be at least 10 characters" })
    .max(500, { message: "bio cannot be more than 500 characters" }),

  yearsOfExperience: z
    .string()
    .min(1, { message: "years of experience is required" }),

  educationalBackground: z
    .string()
    .min(1, { message: "educational background is required" }),

  industry: z.string().min(1, { message: "industry is required" }),

  skills: z
    .array(z.string())
    .min(1, { message: "at least one skill is required" }),

  linkedinProfile: z
    .string()
    .url({ message: "linkedinProfile must be a valid URL" }),

  learningGoals: z
    .string()
    .min(10, { message: "learning goals must be at least 10 characters" })
    .optional(), // Only for mentees

  currentJobTitle: z
    .string()
    .min(1, { message: "current job title is required" })
    .optional(), // Only for mentors

  mentorshipGoals: z
    .string()
    .min(10, { message: "mentorship goals must be at least 10 characters" })
    .optional(), // Only for mentors

  portfolio: z
    .string()
    .url({ message: "portfolio must be a valid URL" })
    .optional(), // Only for mentors

  company: z.string().optional(),
});

module.exports = { updateUserBodySchema };
