const utils = require("../utils/utils");
const { signUpBodySchema } = require("./dto/signUp.dto");
const { authService } = require("./authService");
const { userService } = require("../user/userService");

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

module.exports = { signUp };
