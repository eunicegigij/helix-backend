const { userService } = require("./userService");
const { updateUserBodySchema } = require("./dto/userProfileDto");
const { ROLES } = require("../constants/constant");
const { handleErrors } = require("../utils/errorHandler");

async function whoami(req, res) {
  try {
    if (!req.user) {
      throw new Error("Please Login to continue");
    }

    // req.user comes from AuthMiddleware (decoded JWT)
    const { userId, email } = req.user;

    console.log(req.user);

    // Get full user profile
    const userProfile = await userService.findById(userId);

    if (!userProfile) {
      throw new Error("Invalid User Id");
    }

    const userData = {
      userId: userProfile.id,
      email,
      fullname: userProfile.fullname,
      skills: userProfile.skills,
      createdAt: userProfile.createdAt,
    };

    res.status(200).json({
      status: true,
      message: "User retrieved successfully",
      data: userData,
    });
  } catch (err) {
    console.error("Error retrieving user", err.message);
    const errorResponse = handleErrors(err);
    res.status(500).json({
      status: false,
      message: errorResponse.message,
      error: errorResponse.errors,
    });
  }
}

async function updateUser(req, res, role) {
  try {
    if (!req.user) {
      throw new Error("Please Login to continue");
    }

    const { userId } = req.user;

    // Validate update data
    const updateData = updateUserBodySchema.parse(req.body);

    // Check if user exists
    const existingUser = await userService.findById(userId);
    if (!existingUser) {
      throw new Error("User not found");
    }

    updateData.role = role;

    // Update user
    const updatedUser = await userService.update(userId, updateData);

    res.status(200).json({
      status: true,
      message: `${role} profile updated successfully`,
      data: { updatedUser },
    });
  } catch (err) {
    console.error(`Error updating ${role} profile`, err.message);
    const errorResponse = handleErrors(err);
    res.status(500).json({
      status: false,
      message:
        errorResponse.message || `Error updating ${role} profile information`,
      error: errorResponse.errors,
    });
  }
}

async function updateMentorProfile(req, res) {
  return updateUser(req, res, ROLES.MENTOR);
}

async function updateMenteeProfile(req, res) {
  return updateUser(req, res, ROLES.MENTEE);
}

module.exports = { whoami, updateMentorProfile, updateMenteeProfile };
