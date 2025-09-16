const express=require("express");
const {signUp}=require("../auth/authcontroller");

const routeManager=express.Router();

routeManager.post("auth/signup",signUp);

module.exports=routeManager;