const express=require("express");
const {signUp}=require("../auth/authcontroller");
const{createProfile}=require("../user/usercontroller");

const routeManager=express.Router();

routeManager.post("/auth/signup",signUp);
routeManager.post("/profile/create", createProfile);

module.exports=routeManager;