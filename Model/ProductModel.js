
// const bcrypt = require("bcrypt");

// const productSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'Product name is required'],
//     trim: true,  // Removes whitespace from both ends
//   },
//   description: {
//     type: String,
//     required: [true, 'Product description is required'],
//     trim: true,
//   },
//   price: {
//     type: Number,
//     required: [true, 'Product price is required'],
//     min: [0, 'Product price must be a positive number'],  // Ensure the price is not negative
//   },
//   category: {
//     type: String,
//     required: [true, 'Product category is required'],
//     trim: true,
//   },
// }, {
//   timestamps: true,  // Automatically adds createdAt and updatedAt fields
// });

// Indexes can be added for better query performance
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  prod_name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = new mongoose.model('Product', productSchema);

