
const jwt = require('jsonwebtoken');
const UserModel = require('../Model/UserModel');
const ProductModel = require('../Model/ProductModel')
const reviewModel = require("../Model/reviewModel")
const bcrypt = require('bcrypt');
const createToken = (userId) => {
  const token = jwt.sign({ userId }, "JWT", { expiresIn: "24h" });
  return token;
};

module.exports.Signup = async (req, res, next) => {
  console.log(req.body, "%%%%%%%%");
  const { email, password, username } = req.body;
  try {
    const emailExists = await UserModel.findOne({ email: email });
    if (emailExists) {
      return res.json({ message: "Email already exists", status: false });
    }
    const newUser = new UserModel({
      username: username,
      email: email,
      password: password,
    });
    const userDetails = await newUser.save();
    const token = createToken(userDetails._id);
    return res.json({
      message: "Account created successfully",
      status: true,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Internal server error in sign up",
      status: false,
    });
  }
};

module.exports.Login = async (req, res, next) => {
  console.log(req.body, "%%%%%%%%%%%%");
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (user) {
      const passwordMatches = await bcrypt.compare(password, user.password);

      if (passwordMatches) {
        const token = createToken(user._id);
        return res
          .status(200)
          .json({
            username: user,
            message: "User login successful",
            created: true,
            token,
          });
      } else {
        return res.json({ message: "incorrect password", created: false });
      }
    } else {
      return res.json({ message: "Account not found", created: false });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Internal server in sign up",
      created: false,
    });
  }
};

module.exports.shopProduct = async (req, res, next) => {
  try {
    const data = await ProductModel.find();
    res.json({
      message: "Product Data fetched",
      status: true,
      shopProduct: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error during product fetching",
      status: false,
    });
  }
};
module.exports.newArrival = async (req, res, next) => {
  try {
    const data = await ProductModel
      .find({ disableProduct: { $ne: true } })
      .sort({ dateAdded: -1 })
      .limit(10);
    res.json({
      message: "newarrival  fetched",
      status: true,
      newArrival: data,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Internal server error in fetch announcement",
      status: false,
    });
  }
};
module.exports.bestseller = async (req, res, next) => {
  try {
    const data = await ProductModel
      .find({ disableProduct: { $ne: true } })
      .sort({ dateAdded: -1 })
      .limit(10);
    res.json({
      message: "best seller fetched",
      status: true,
      bestseller: data,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Internal server error in fetch announcement",
      status: false,
    });
  }
};
module.exports.men = async (req, res, next) => {
  try {
    const data = await ProductModel
      .find({ disableProduct: { $ne: true } })
      .sort({ dateAdded: -1 })
      .limit(10);
    res.json({
      message: "best seller fetched",
      status: true,
      men: data,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Internal server error in fetch announcement",
      status: false,
    });
  }
};
module.exports.women = async (req, res, next) => {
  try {
    const data = await ProductModel
      .find({ disableProduct: { $ne: true } })
      .sort({ dateAdded: -1 })
      .limit(10);
    res.json({
      message: "best seller fetched",
      status: true,
      women: data,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Internal server error in fetch announcement",
      status: false,
    });
  }
};

module.exports.bodybath = async (req, res, next) => {
  try {
    const data = await ProductModel
      .find({ disableProduct: { $ne: true } })
      .sort({ dateAdded: -1 })
      .limit(10);
    res.json({
      message: "best seller fetched",
      status: true,
      bodybath: data,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Internal server error in fetch announcement",
      status: false,
    });
  }
};

module.exports.productDetails = async (req, res) => {
  try {
    const productId = req.params.id;
    const singleProduct = await ProductModel.findById(productId);
    if (singleProduct) {
      return res.status(200).json({
        message: "success",
        status: true,
        product: singleProduct,
      });
    }
    res.status(404).json({
      message: "Product not found",
      status: false,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
      status: false,
    });
  }
};



module.exports.getUser = async (req, res) => {
  try {
    const userId = req.user.id;

    if (userId) {
      res.status(200).json({ message: "User id fetched", userId: userId });
    } else {
      res.status(404).json({ message: "User id not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.userStatus = async (req, res) => {
  try {
    const user = req.user;
    console.log(user)
    if (user) {
      res.json({ user })
    } else {
      res.json({ user: null })
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.getReviews = async (req, res) => {
  try {
    const reviews = await reviewModel
      .find({ productId: req.params.productId })
      .populate("userId", "username");
    res.json(reviews);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.postReviews = async (req, res) => {
  const review = new reviewModel({
    productId: req.body.productId,
    userId: req.user.id,
    rating: req.body.rating,
    comment: req.body.comment,
  });

  try {
    const newReview = await review.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports.AddToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const user = await UserModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.wishlist.includes(productId)) {
      // Remove product from wishlist
      user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
      await user.save();
      return res.status(201).json({
        message: "Product removed from wishlist",
      });
    } else {
      // Add product to wishlist
      user.wishlist.push(productId);
      await user.save();
      return res.status(200).json({
        message: "Product added to wishlist",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports.checkWislist = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = await UserModel.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isInWishlist = user.wishlist.includes(productId);
    res.status(200).json({
      inWishlist: isInWishlist,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};
