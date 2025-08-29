const express=require("express");
const cors=require("cors");
const connectDB=require("./database/database");

const app =express();
const PORT= process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

connectDB()
    .then(()=>{
        app.listen(3000, ()=>{
            console.log("Server is running on http://localhost:${PORT}");
        });
    })
    .catch((err)=>{
        console.log(err,"Database Connection Failed");
        process.exit(1);
    });





