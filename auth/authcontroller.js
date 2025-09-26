const utils = require("../utils/utils");
const { signUpBodySchema } = require("./dto/signUp.dto");
const { authService } = require("./authService");
const { userService } = require("../user/userService");
const jwt = require("jsonwebtoken");
const { ENV } = require("../configs/connection");

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
    const { email, password } = req.body;

    // Check if email exists using your existing getAuthByFilter
    const authUsers = await authService.getAuthByFilter({ email });

    if (!authUsers || authUsers.length === 0) {
      return res.status(401).json({
        status: false,
        message: "Invalid email or password",
        data: {},
      });
    }

    const authUser = authUsers[0]; // Get first match

    // Compare password using your existing utils.comparePassword
    const isPasswordValid = await utils.compare(password, authUser.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        status: false,
        message: "Invalid email or password",
        data: {},
      });
    }

    // Get user profile using authId (since User schema references Auth._id)
    const userProfile = await userService.findByAuthId(authUser._id);

    // Create JWT token with userId and email
    const token = jwt.sign(
      {
        userId: userProfile ? userProfile._id : null,
        email: authUser.email,
      },
      ENV.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(200).json({
      status: true,
      message: "Login successful",
      data: {
        token,
        userId: userProfile ? userProfile._id : null,
        email: authUser.email,
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
