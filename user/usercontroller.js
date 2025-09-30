const { userService } = require("./userService");

async function whoami(req, res) {
  try {
    // req.user comes from AuthMiddleware (decoded JWT)
    const { userId, email } = req.user;

    if (!userId) {
      return res.status(404).json({
        status: false,
        message: "User profile not found. Please complete your profile.",
        data: { email },
      });
    }

    // Get full user profile
    const userProfile = await userService.findByAuthId(userId);

    if (!userProfile) {
      return res.status(404).json({
        status: false,
        message: "User profile not found",
        data: {},
      });
    }

    res.status(200).json({
      status: true,
      message: "User retrieved successfully",
      data: {},
    });
  } catch (err) {
    console.error("Error retrieving user", err.message);
    res.status(500).json({
      status: false,
      message: "Error retrieving user information",
      error: err.message,
    });
  }
}

module.exports = { whoami };
