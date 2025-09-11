const dotenv=require("dotenv");
const connectDB=require("./database/database");
const {app}=require("./app");

dotenv.config();
const PORT= 3000;

connectDB()
    .then(()=>{
        app.listen(PORT, ()=>{
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err)=>{
        console.log(err,"Database Connection Failed");
        process.exit(1);
    });


