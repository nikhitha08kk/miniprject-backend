const express = require("express");

const cors = require("cors");
const dbConnection = require("./Configure/dbconnection");
const app = express();
const UserRoutes=require('../backend/Routes/UserRoutes')
const AdminRoutes= require("./Routes/AdminRoutes")
dbConnection.dbConnect();
app.use(cors());
app.use(express.json());
app.use("/", UserRoutes);
//app.use('/admin',AdminRoutes);
const PORT = 8000;
app.listen(PORT, () =>{
    console.log(`server started at port ${PORT}`)
}
);



