const express = require("express");
const {
  signUp,
  login,
  forgetPassword,
  resetPassword,
  updatePasswordWithAuth,
} = require("../api/auth/authcontroller");
const {
  whoami,
  updateMentorProfile,
  updateMenteeProfile,
} = require("../api/user/usercontroller");
const { AuthMiddleware } = require("../middleware/authenticationMiddleware");

const routeManager = express.Router();

routeManager.post("/auth/signup", signUp);
routeManager.post("/auth/login", login);
routeManager.post("/auth/forget-password", forgetPassword);
routeManager.post("/auth/reset-password", resetPassword);
routeManager.post(
  "/auth/update-password",
  AuthMiddleware,
  updatePasswordWithAuth
);
routeManager.get("/whoami", AuthMiddleware, whoami);
//routeManager.patch("/user/update-profile", AuthMiddleware, updateUser);
routeManager.patch(
  "/user/mentor/update-profile",
  AuthMiddleware,
  updateMentorProfile
);
routeManager.patch(
  "/user/mentee/update-profile",
  AuthMiddleware,
  updateMenteeProfile
);

module.exports = routeManager;
