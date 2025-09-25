const mongoose = require("mongoose");
const { ROLES } = require("../../constants/constant");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    authId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
      unique: true,
    },

    fullname: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: Object.values(ROLES),
      required: false,
    },

    availability: {
      startTime: {
        type: String, // Store as "09:30 AM"
        required: false,
      },
      endTime: {
        type: String, // Store as "05:00 PM"
        required: false,
      },
    },

    timezone: {
      type: String,
      required: false,
    },

    location: {
      type: String,
      required: false,
    },

    bio: {
      type: String,
      required: false,
    },

    yearsOfExperience: {
      type: String,
      required: false,
    },

    educationalBackground: {
      type: String,
      required: false,
    },

    industry: {
      type: String,
      required: false,
    },

    skills: {
      type: [String],
      required: false,
    },

    linkedinProfile: {
      type: String,
      required: false,
    },

    learningGoals: {
      type: String,
      required: false,
    },

    // Mentor-specific fields
    currentJobTitle: {
      type: String,
      required: false,
    },

    mentorshipGoals: {
      type: String,
      required: false,
    },

    portfolio: {
      type: String,
      required: false,
    },

    company: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
