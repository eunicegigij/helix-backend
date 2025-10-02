const express = require("express");
const { signUp, login } = require("../auth/authcontroller");
const { whoami, updateUser } = require("../user/usercontroller");
const { AuthMiddleware } = require("../middleware/authenticationMiddleware");

const routeManager = express.Router();

routeManager.post("/auth/signup", signUp);
routeManager.post("/auth/login", login);
routeManager.get("/whoami", AuthMiddleware, whoami);
routeManager.patch("/user/update", AuthMiddleware, updateUser);

module.exports = routeManager;
