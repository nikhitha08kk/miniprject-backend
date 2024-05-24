const AdminModel = require('../Model/AdminModel');
const jwt = require("jsonwebtoken");
const UserModel=require('../Model/UserModel')
const bcrypt = require("bcrypt");
const maxAge = 3*24*60*60

const createToken = (adminId) => {
    const token = jwt.sign({ adminId }, "JWT", { expiresIn: maxAge });
    return token;
};

module.exports.Login = async (req, res, next) => {
    console.log(req.body,"%%%%%%%%%%%%%%%%%%%")
    const { email, password } = req.body;
    // try {
    //     const admin = await AdminModel.findOne({ email });
    //     if (admin) {
    //         return res.json({ message: "User not found", status: false });
    //     }
    //     const token = createToken(user._id);
    //     return res.json({
    //         message: "Admin Login successful",
    //         status: true,
    //         token,
          
    //     });
    // } catch (error) {
    //     console.log(error);
    //     return res.json({ message: "Internal server error in login", status: false });
    // }
    try{
        const admin=await AdminModel.findOne({email});
        if(admin){
            const passwordMatches = await bcrypt.compare(password,admin.password);
            if(passwordMatches){
                const token = createToken(admin._id);
                return res.status(200).json({
                    admin: admin,
                    message:"admin login succesful",
                    created: true,
                    token,
                });
            }
            else{
                return res.json({
                    message:"incorrect password",
                    created: false,
                });
            }
        }else{
            return res.json({
                message:"Account not found",
                created:false,
            });
        }
    }catch (error){
        console.log(error);
        return res.json({
            message:"Internal server in sign Up",
            created:false,
        })
    }
  
};
module.exports.userList = async (req, res, next) => {
    try{
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
