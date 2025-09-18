const { z } = require('zod');
const { ROLES } = require("../../constants/constant");

const baseUserSchema = z.object({
    authId: z.string().min(1, "Auth ID is required"),
    role: z.enum([ROLES.MENTOR, ROLES.MENTEE], "Role must be either mentor or mentee"),
    availability: z.object({
        startTime: z.string().min(1, "Start time is required"),
        endTime: z.string().min(1, "End time is required")
    }),
    timezone: z.string().min(1, "Timezone is required"),
    location: z.string().min(1, "Location is required"),
    bio: z.string().min(10, "Bio must be at least 10 characters").max(700,"Bio can't be more than 700 characters"),
    yearsOfExperience: z.string().min(1, "Years of experience is required"),
    educationalBackground: z.string().min(1, "Educational background is required"),
    skills: z.array(z.string()).min(1, "At least one skill is required"),
    linkedinProfile: z.string().url("Must be a valid LinkedIn URL")
});

const menteeSchema = baseUserSchema.extend({
    role: z.literal(ROLES.MENTEE),   
    industry: z.string().min(1, "Industry is required for mentees"),
    learningGoals: z.string().min(10, "Learning goals must be at least 10 characters"),
    company: z.string().optional()
});

const mentorSchema = baseUserSchema.extend({
    role: z.literal(ROLES.MENTOR),
    currentJobTitle: z.string().min(1, "Current job title is required for mentors"),
    company: z.string().min(1, "Company is required for mentors"),
    mentorshipGoals: z.string().min(10, "Mentorship goals must be at least 10 characters"),
    portfolio: z.string().url("Portfolio must be a valid URL")
});

const createUserProfileSchema = z.discriminatedUnion("role", [
    menteeSchema,
    mentorSchema
]);

module.exports = {
    createUserProfileSchema,
    menteeSchema,
    mentorSchema
};