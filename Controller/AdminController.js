const AdminModel = require('../Model/AdminModel');
const ProductModel=require("../Model/ProductModel");
const jwt = require("jsonwebtoken");
const UserModel = require('../Model/UserModel')
const bcrypt = require("bcrypt");
const maxAge = 3 * 24 * 60 * 60;
// const { validationResult } = require("express-validator");
// const { Products } = require('../../frontend/src/Services/Adminapi');
// const { Products}=require("../../frontend/src/Services/Adminapi")

const createToken = (adminId) => {
  const token = jwt.sign({ adminId }, "JWT", { expiresIn: maxAge });
  return token;
};

module.exports.Login = async (req, res, next) => {
  console.log(req.body, "%%%%%%%%%%%%%%%%%%%")
  const { email, password } = req.body;
 
  try {
    const admin = await AdminModel.findOne({ email });
    if (admin) {
      const passwordMatches = await bcrypt.compare(password, admin.password);
      if (passwordMatches) {
        const token = createToken(admin._id);
        return res.status(200).json({
          admin: admin,
          message: "admin login succesful",
          created: true,
          token,
        });
      }
      else {
        return res.json({
          message: "incorrect password",
          created: false,
        });
      }
    } else {
      return res.json({
        message: "Account not found",
        created: false,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Internal server in sign Up",
      created: false,
    })
  }

};
module.exports.UserList = async (req, res, next) => {
  try {
    const data = await UserModel.find();

    res.json({
      message: "User list fetched",
      status: true,
      UserList: data,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Internal server error in userlist",
      status: false,
    });
  }
};

//delete User

exports.removeUser = async (req, res) => {
  try {
    const { userId } = req.params;
    await UserModel.findByIdAndDelete(userId);
    res.status(200).json({ message: "User removed successfully", status: true });
  } catch (error) {
    console.error("Error removing user:", error);
    res.status(500).json({ message: "Internal server error", status: false });
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    await ProductModel.findByIdAndDelete(productId);
    res.status(200).json({ message: "Product removed successfully", status: true });
  } catch (error) {
    console.error("Error removing user:", error);
    res.status(500).json({ message: "Internal server error", status: false });
  }
};




module.exports.AddProducts= async (req, res) => {
  try {
    const { prod_name, price, description, image, category } = req.body;

    // Create a new product instance
    const products = new ProductModel({
      prod_name,
      price,
      description,
      image,
      category
    });

    // Save the product to the database
    await products.save();

    // Send a success response
    res.status(200).json({ message: "Product added successfully" });
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(400).json({ error: error.message });
  }
};
module.exports.productList=async (req,res,next)=>{

  try{
    const data=await ProductModel.find();

    res.status(200).json({
      message: "Products fetched",
      status: true,
      productList: data,
    });
  }
  catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error during product fetching",
      status: false,
    });
  }
};

module.exports.editProduct = async (req, res) => {
  try{
    const product = await ProductModel.findById(req.params.id);
    if(!product){
      return res.status(404).json({ message: "Product not found "});
    }

    Object.assign(product, req.body);

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch(error) {
    res.status(400).json({ message: error.message});
  }
};

module.exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
};




