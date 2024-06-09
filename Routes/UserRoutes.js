// const express = require ("express");
// const { Signup, Login, Newarrivals, Bestseller, Men, Women, Bodywash } = require("../Controller/UserController");
// const router = express.Router();
// // const userAuth = require("../Middleware/userAuth")
// router.get('/',userAuth)
// router.post('/signup',Signup);
// router.post('/login',Login);
// router.get('/newarrival',Newarrivals);
// router.get('/bestseller',Bestseller);
// router.get('/men',Men);
// router.get('/women',Women);
// router.get('/bodywash',Bodywash);
// module.exports=router;
const express = require('express');
const router = express.Router();
const { Signup, Login,newArrival,shopProduct,Bestseller,Men,Women,Bodywash} = require("../Controller/UserController");
const userAuth = require("../Middleware/userAuth")
router.get('/Newarrival',newArrival)
router.get('/bestseller',Bestseller)
router.get('/men',Men);
router.get('/women',Women);
router.get('/bodywash',Bodywash);
router.get('/',userAuth)
router.post('/signup',Signup)
router.post('/login',Login);


router.get('/shop',shopProduct)


// Example of a route
router.get('/example', (req, res) => {
    res.send('Hello World');
});

module.exports = router;