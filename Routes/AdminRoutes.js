 const express = require("express");
const {Login,userList}=require("../Controller/AdminController")
const router=express.Router();

router.post("/login",Login)

// const adminAuth=require("../Middleware/adminAuth")

// router.get("/dashboard", (req, res) => {
//     // Handle admin dashboard logic
//   });
router.get("/", userList);
module.exports = router;
