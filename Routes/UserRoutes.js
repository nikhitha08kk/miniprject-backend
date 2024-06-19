

const express = require('express');
const router = express.Router();
const { Signup,
    Login,
    newArrival,
    bestseller,
    men,
    women,
    bodybath,
    shopProduct,
    productDetails,
    userStatus,
    getUser,
    getReviews,
    postReviews, 
    AddToWishlist,
    checkWislist,} = require("../Controller/UserController");
const userAuth = require("../Middleware/userAuth")
//get
router.get('/shop/Newarrival', newArrival)
router.get('/bestseller', bestseller)
router.get('/men', men);
router.get('/women', women);
router.get('/bodybath', bodybath);
router.get('/auth/status', userStatus)
router.get('/user/:id', getUser)
router.get('/shop/:id', productDetails);
router.get('/shop', shopProduct)
router.get('/example', (req, res) => {
    res.send('Hello World');
});
router.get("/reviews/:productId", getReviews);
router.get("/wishlist/check/:productId",checkWislist)
// router.get('/',userAuth)

//post
router.post('/signup', Signup)
router.post('/login', Login);
router.post("/reviews/create", postReviews);
router.post("/wishlist",AddToWishlist)


// router.post("/createorder",createOrder);
;
// router.get("/auth/status", userStatus);
// router.get("/user", getUser);
// router.get("/",featuredProducts);
// Example of a route


module.exports = router;