const express = require("express");
const { Login, UserList,removeUser, AddProducts,productList,deleteProduct,editProduct,getProductById} = require("../Controller/AdminController");
const adminAuth =require("../Middleware/adminAuth")
const router = express.Router();
// const { check } = require('express-validator');
// const { validateProduct } = require('../Middleware/validation');


// POST routes
router.post("/login", Login);
// router.post("/add-product", AddProducts);
router.post("/add",AddProducts);
//delete methode
router.delete('/user/:userId', removeUser);
router.delete('/product/:productId', deleteProduct)
// GET routes
router.get("/users",UserList);
// router.get("/view-products", viewProducts);
router.get('/product/:id', getProductById)
router.get("/product",productList)


//Put method

router.put('/product/:id', editProduct);





module.exports = router;
