 const express = require("express");
const {Login}=require("../Controller/AdminController")
const router=express.Router();

router.post("/login",Login)

// const adminAuth=require("../Middleware/adminAuth")

// router.get("/dashboard", (req, res) => {
//     // Handle admin dashboard logic
//   });
module.exports = router;
