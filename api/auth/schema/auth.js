const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    lastLogin: {
      type: Date,
      default: null,
      required: false,
    },
    emailVerified: {
      type: Boolean,
      default: true, // is this correct?
    },
    verificationToken: {
      type: String,
    },
    verificationTokenExpiryDate: {
      type: Date,
      default: null,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Auth", authSchema);
