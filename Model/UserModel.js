const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true, 
    },
   
   
    bolckStatus: {
        type: Boolean,
        default: true,
    },
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
      }]
 
});
// userSchema.pre("save",async function(next){
//     const salt = await bcrypt.genSalt();
//     this.password = await bcrypt.hash(this.password, salt)
    
// });
userSchema.pre('save', async function (next) {
    // Check if password is modified
    if (!this.isModified('password')) {
      return next();
    }
    
    try {
      // Hash the password with a salt round of 10
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (err) {
      next(err);
    }
  });
module.exports = new mongoose.model("user",userSchema);