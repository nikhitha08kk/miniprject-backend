
const jwt = require('jsonwebtoken');
const UserModel = require('../Model/UserModel');
const ProductModel=require('../Model/ProductModel')
const bcrypt = require('bcrypt');
const createToken = (userId) => {
    const token = jwt.sign({ userId }, "JWT", { expiresIn: "24h" });
    return token;
};

module.exports.Signup = async (req, res, next) => {
    console.log(req.body, "%%%%%%%%");
    const { email, password,username } = req.body;

    // try {
    //     const emailExists = await UserModel.findOne({ email: email });
    //     if (emailExists) {
    //         return res.json({ message: "Email already exists", status: false });
    //     }
    //     const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    //     const newUser = new UserModel({
    //         userName: username,
    //         email: email,
    //         password: hashedPassword, // Store the hashed password
    //     });
    //  const { email, password, name } = req.body;
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
        message: "latest arrival fetched",
        status: true,
        LatestArrival: data,
      });
    } catch (error) {
      console.log(error);
      res.json({
        message: "Internal server error in fetch announcement",
        status: false,
      });
    }
  };
  
  module.exports.Men = async (req, res, next) => {
    try {
      const data = await ProductModel
        .find({ disableProduct: { $ne: true } })
        .sort({ dateAdded: -1 })
        .limit(10);
      res.json({
        message: "latest arrival fetched",
        status: true,
        LatestArrival: data,
      });
    } catch (error) {
      console.log(error);
      res.json({
        message: "Internal server error in fetch announcement",
        status: false,
      });
    }
  };
  module.exports.Women = async (req, res, next) => {
    try {
      const data = await ProductModel
        .find({ disableProduct: { $ne: true } })
        .sort({ dateAdded: -1 })
        .limit(10);
      res.json({
        message: "latest arrival fetched",
        status: true,
        LatestArrival: data,
      });
    } catch (error) {
      console.log(error);
      res.json({
        message: "Internal server error in fetch announcement",
        status: false,
      });
    }
  };
  module.exports.Bestseller= async (req, res, next) => {
    try {
      const data = await ProductModel
        .find({ disableProduct: { $ne: true } })
        .sort({ dateAdded: -1 })
        .limit(10);
      res.json({
        message: "latest arrival fetched",
        status: true,
        LatestArrival: data,
      });
    } catch (error) {
      console.log(error);
      res.json({
        message: "Internal server error in fetch announcement",
        status: false,
      });
    }
  };
  module.exports.Bodywash= async (req, res, next) => {
    try {
      const data = await ProductModel
        .find({ disableProduct: { $ne: true } })
        .sort({ dateAdded: -1 })
        .limit(10);
      res.json({
        message: "latest arrival fetched",
        status: true,
        LatestArrival: data,
      });
    } catch (error) {
      console.log(error);
      res.json({
        message: "Internal server error in fetch announcement",
        status: false,
      });
    }
  };
  



