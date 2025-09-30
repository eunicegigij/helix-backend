const utils = require("../utils/utils");
const { signUpBodySchema } = require("./dto/signUp.dto");
const { authService } = require("./authService");
const { userService } = require("../user/userService");
const jwt = require("jsonwebtoken");
const { ENV } = require("../configs/connection");
const { loginBodySchema } = require("./dto/login.dto");

async function signUp(req, res) {
  try {
    const signData = signUpBodySchema.parse(req.body);
    const { email, password, fullname } = signData;
    const hash = await utils.hashPassword(password);
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
    res.status(500).json({
      status: false,
      message: "Error Creating Account",
      error: err.message,
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

    // Compare password using your existing utils.comparePassword
    const isPasswordValid = await utils.compare(password, authUser.password);

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
    console.error("Error during login", err.message);
    res.status(500).json({
      status: false,
      message: "Error during login",
      error: err.message,
    });
  }
}

module.exports = { signUp, login };
