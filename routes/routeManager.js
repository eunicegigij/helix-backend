const express=require("express");
const {userValidationRules,validate}=require("../middleware/validateSignup");
const {signUp}=require("../auth/authcontroller");

const routeManager=express.Router();

routeManager.post("/signup",[userValidationRules],validate,signUp);

module.exports=routeManager;