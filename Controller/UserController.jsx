const UserModel = require('../Model/UserModel');
const userModel = require('../Model/UserModel');
const jwt = require("jsonwebtoken");

const createToken = (userId) => {
    const token = jwt.sign({ userId }, "JWT", { expiresIn: "24h" }); // Corrected expiresIn syntax
    return token;
};

module.exports.signup = async (req, res, next) => {
    const { email, password, username } = req.body;
    try {
        const emailExists = await userModel.findOne({ email: email });
        if (emailExists) {
            return res.json({ message: "Email already exists", status: false });
        }
        const newUser = new UserModel({
            username: username,
            email: email,
            password: password,
        });
        const userDetails = await newUser.save();
        const token = createToken(userDetails._id); // Use userDetails._id instead of userModel._id
        return res.json({
            message: "Account created successfully",
            status: true, // Corrected status to true as the account creation is successful
            token,
        });
    } catch (err) {
        console.log(err); // Changed error to err to log the correct error
        return res.json({
            message: "Internal server error in sign up",
            status: false,
        });
    }
};
