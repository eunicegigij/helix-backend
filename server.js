const connectDB=require("./database/database");
const {app}=require("./app");
const {ENV}= require("./configs/connection");

const port=ENV.PORT;

connectDB()
app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
});
    

