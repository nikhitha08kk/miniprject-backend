const UserModel = require('../Model/UserModel');
const jwt = require("jsonwebtoken");

const createToken = (userId) => {
    const token = jwt.sign({ userId }, "JWT", { expiresIn: "24h" });
    return token;
};

module.exports.Signup = async (req, res, next) => {
    console.log(req.body,"%%%%%%%%");
    const { email, password, username } = req.body;
    try {
        const emailExists = await UserModel.findOne({ email: email });
        if (emailExists) {
            return res.json({ message: "Email already exists", status: false });
        }
        const newUser = new UserModel({
            userName: username,
            email: email,
            password: password,
        });
        const userDetails = await newUser.save();
        const token = createToken(userDetails._id); // Use userDetails._id instead of UserModel._id
        return res.json({
            message: "Account created successfully",
            status: true, // Set status to true as account creation is successful
            token,
        });
    } catch (err) { // Changed error to err to log the correct error
        console.log(err); // Log the error for debugging
        return res.json({
            message: "Internal server error in sign up",
            status: false,
        });
    }
};
