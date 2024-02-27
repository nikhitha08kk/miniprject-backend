const express = require("express");
const cors = require("cors");
const dbConnection = require("./Configure/dbconnection");
const app = express();
dbConnection.dbConnect();
const PORT = 8000;
app.listen(PORT, () =>{
    console.log(`server started at port ${PORT}`)
}
);