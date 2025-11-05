const {
  hashPassword,
  compare,
  generateToken,
  getOtpExpiryTime,
} = require("../../utils/utils");
const { signUpBodySchema } = require("./dto/signUp.dto");
const { authService } = require("./authService");
const { userService } = require("../user/userService");
const { handleErrors } = require("../../utils/errorHandler");
const jwt = require("jsonwebtoken");
const { ENV } = require("../../configs/connection");
const { loginBodySchema } = require("./dto/login.dto");
const { updatePasswordSchema } = require("./dto/updatePassword.dto");
const { forgetPasswordSchema } = require("./dto/forgetPassword.dto");
const { resetPasswordSchema } = require("./dto/resetPassword.dto");

async function signUp(req, res) {
  try {
    const signData = signUpBodySchema.parse(req.body);
    const { email, password, fullname } = signData;
    const hash = await hashPassword(password);
    const userAuth = await authService.create({
      email,
      password: hash,
    });

    console.log("User Auth has been created");

    await userService.create({
      authId: userAuth.id,
      fullname,
    });

    console.log("User has been created");

    res.status(201).json({
      status: true,
      message: "Registration successful",
      data: {},
    });
  } catch (err) {
    console.error("Error saving user", err);

    const errorResponse = handleErrors(err);

    res.status(500).json({
      status: false,
      message: errorResponse.message,
      error: errorResponse.errors,
    });
  }
}

async function login(req, res) {
  try {
    const loginData = loginBodySchema.parse(req.body);
    const { email, password } = loginData;

    // Check if email exists using your existing getAuthByFilter
    const authUser = await authService.getAuthByFilter({ email });

    if (!authUser) {
      throw new Error("Invalid Login Details");
    }

    // Compare password using your existing comparePassword
    const isPasswordValid = await compare(password, authUser.password);

    if (!isPasswordValid) {
      throw new Error("Invalid Login Details");
    }

    // Get user profile using authId (since User schema references Auth._id)
    const userProfile = await userService.findByAuthId(authUser.id);

    if (!userProfile) {
      throw new Error("Invalid Auth Id");
    }

    // Create JWT token with userId and email

    const userData = {
      userId: userProfile.id,
      email: authUser.email,
    };

    const accessToken = jwt.sign(
      userData,
      ENV.JWT_SECRET,
      { expiresIn: "2h" } // short lifetime
    );

    const refreshToken = jwt.sign(
      userData,
      ENV.JWT_REFRESH_SECRET,
      { expiresIn: "7d" } // longer lifetime
    );

    res.status(200).json({
      status: true,
      message: "Login successful",
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (err) {
    console.error("Error during login", err);
    const errorResponse = handleErrors(err);
    res.status(500).json({
      status: false,
      message: errorResponse.message,
      error: errorResponse.errors,
    });
  }
}

async function updatePasswordWithAuth(req, res) {
  try {
    if (!req.user) {
      throw new Error("Please Login to continue");
    }

    const passwordData = updatePasswordSchema.parse(req.body);
    const { currentPassword, newPassword } = passwordData;
    const { email } = req.user;

    // Get user auth
    const authUser = await authService.getAuthByFilter({ email });

    if (!authUser) {
      throw new Error("User not found");
    }

    // Verify current password
    const isPasswordValid = await compare(currentPassword, authUser.password);

    if (!isPasswordValid) {
      throw new Error("Current password is incorrect");
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Update password
    await authService.updatePassword(authUser.id, hashedPassword);

    res.status(200).json({
      status: true,
      message: "Password updated successfully",
      data: {},
    });
  } catch (err) {
    console.error("Error updating password", err.message);
    const errorResponse = handleErrors(err);
    res.status(500).json({
      status: false,
      message: errorResponse.message,
      error: errorResponse.errors,
    });
  }
}

// Forget Password (Generate token and send)
async function forgetPassword(req, res) {
  try {
    const emailData = forgetPasswordSchema.parse(req.body);
    const { email } = emailData;

    // Check if email exists
    const authUsers = await authService.getAuthByFilter({ email });

    if (!authUsers) {
      throw new Error("User not found");
    }

    const authUser = await authService.getAuthByFilter({ email });
    // Generate token
    const token = generateToken();

    // Get expiry time (10 minutes from now)
    const expiryDate = getOtpExpiryTime(10);

    // Save token and expiry in database
    await authService.saveVerificationToken(authUser._id, token, expiryDate);

    // TODO: Send email with token (implement email service)
    // For now, return token in response

    res.status(200).json({
      status: true,
      message: "Password reset token generated successfully",
      data: {
        token, // Remove this in production - send via email instead
      },
    });
  } catch (err) {
    console.error("Error in forget password", err.message);
    const errorResponse = handleErrors(err);
    res.status(500).json({
      status: false,
      message: errorResponse.message,
      error: errorResponse.errors,
    });
  }
}

// Reset Password (Using token)
async function resetPassword(req, res) {
  try {
    const resetData = resetPasswordSchema.parse(req.body);
    const { token, newPassword } = resetData;
    const verificationToken = token;
    // Find user by token
    const authUser = await authService.getAuthByFilter({
      verificationToken,
    });

    if (!authUser) {
      return new Error("Invalid Token");
    }

    if (!authUser.verificationTokenExpiryDate) {
      return new Error("Auth Token was not required");
    }

    // Check if token has expired
    const currentTime = new Date().getTime();
    if (currentTime > authUser.verificationTokenExpiryDate) {
      throw new Error("Token has expired. Please request a new password reset");
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Update password and clear token
    await authService.updateAuth(authUser._id, {
      password: hashedPassword,
      verificationToken: null,
      verificationTokenExpiryDate: null,
    });

    res.status(200).json({
      status: true,
      message: "Password reset successful",
      data: {},
    });
  } catch (err) {
    console.error("Error resetting password", err.message);
    const errorResponse = handleErrors(err);
    res.status(500).json({
      status: false,
      message: errorResponse.message,
      error: errorResponse.errors,
    });
  }
}

module.exports = {
  signUp,
  login,
  updatePasswordWithAuth,
  forgetPassword,
  resetPassword,
};
