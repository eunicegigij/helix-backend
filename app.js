const express=require("express");
const cors=require("cors");
const routeManager=require("./routes/routeManager");

const app =express();

app.use(cors());
app.use(express.json());
app.use("/",routeManager);
app.use(express.urlencoded({extended:true}));

module.exports={app};






