const express = require("express");
const { Login, UserList,removeUser, AddProducts,productList,editProduct,getProductById} = require("../Controller/AdminController");
const adminAuth =require("../Middleware/adminAuth")
const router = express.Router();
// const { check } = require('express-validator');
// const { validateProduct } = require('../Middleware/validation');


// POST routes
router.post("/login", Login);
// router.post("/add-product", AddProducts);
router.post("/add", adminAuth,AddProducts);
//delete methode
router.delete('/user/:userId',adminAuth, removeUser);

// GET routes
router.get("/users",UserList);
// router.get("/view-products", viewProducts);
router.get('/product/:id',adminAuth, getProductById)
router.get("/product", productList)


//Put method

router.put('/product/:id',adminAuth, editProduct);


//DELETE Methods


module.exports = router;
