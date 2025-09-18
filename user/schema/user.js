const mongoose = require("mongoose");
const { ROLES } = require("../../constants/constant");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    authId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth',
        required: true,
        unique: true
    },

    role: {
        type: String,
        enum: Object.values(ROLES),
        required: true
    },

    availability: {
        startTime: {
            type: String, // Store as "09:30 AM"
            required: true
        },
        endTime: {
            type: String, // Store as "05:00 PM"
            required: true
        },
    },

    timezone: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    bio: {
        type: String,
        required: true
    },

    yearsOfExperience: {
        type: String,
        required: true
    },

    educationalBackground: {
        type: String,
        required: true
    },

    industry: {
        type: String,
        required: function() {
            return this.role === ROLES.MENTEE;
        }
    },

    skills: {
        type: [String],
        required: true
    },

    linkedinProfile: {
        type: String,
        required: true
    },

    learningGoals: {
        type: String,
        required: function() {
            return this.role === ROLES.MENTEE;
        }
    },

    // Mentor-specific fields
    currentJobTitle: {
        type: String,
        required: function() {
            return this.role === ROLES.MENTOR;
        }
    },

    mentorshipGoals: {
        type: String,
        required: function() {
            return this.role === ROLES.MENTOR;
        }
    },

    portfolio: {
        type: String,
        required: function() {
            return this.role === ROLES.MENTOR;
        }
    },

    company: {
        type: String,
        required: function() {
            return this.role === ROLES.MENTOR;
        }
    }

}, { timestamps: true });


module.exports = mongoose.model("User", userSchema);