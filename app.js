const express = require("express");
const cors = require("cors");
const dbConnection = require("./Configure/dbconnection");
const app = express();
const UserRoutes= require("./Routes/UserRoutes")
const AdminRouter= require("./Routes/AdminRoutes")
dbConnection.dbConnect();
const PORT = 8000;
app.listen(PORT, () =>{
    console.log(`server started at port ${PORT}`)
}
);
app.use('/',UserRoutes)
app.use('/admin',AdminRouter);