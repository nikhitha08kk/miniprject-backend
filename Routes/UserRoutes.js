const express = require ("express");
const { Signup, Login } = require("../Controller/UserController");
const router = express.Router();
const userAuth = require("../Middleware/userAuth")
router.get('/',userAuth)
router.post('/signup',Signup);
router.post('/login',Login);
module.exports=router