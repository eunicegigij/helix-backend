const { userService } = require("./userService");

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
    res.status(500).json({
      status: false,
      message: "Error retrieving user information",
      error: err.message,
    });
  }
}

module.exports = { whoami };
