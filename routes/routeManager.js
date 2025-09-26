const express = require("express");
const { signUp, login } = require("../auth/authcontroller");
const { createProfile } = require("../user/usercontroller");

const routeManager = express.Router();

routeManager.post("/auth/signup", signUp);
routeManager.post("/auth/login", login);

module.exports = routeManager;
