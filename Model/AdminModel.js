const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const adminSchema = new mongoose.Schema({
    userName:{
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
        default: false,
    },
 
});
adminSchema.pre("save",async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
});
module.exports = new mongoose.model("admin",adminSchema)