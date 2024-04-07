const jwt = require("jsonwebtoken"); 
const UserModel = require("../Model/UserModel")
module.exports = async(req,res,next)=>{
    try{
        const authHeader =req.headers.authorization;
        console.log(authHeader,"middleware one");
        const authToken=authHeader && authHeader.split(" ")[1];
        console.log(authToken,"midleware two");
        if(!authToken){
            return res.json({
                loginfail: true,
                status:false,
                message:"No auth token",
            });
        }
        const decode = jwt.verify(authToken,"JWT");
        const user= await UserModel.findOne({_id: decode.id});

        if(!user){
            return res.json({
                message:"unauthorized access",
                status:false,
                loginfail:true,
            });
        }
        req.user= user;
        next();
    }
    catch(error){
        console.log(error);
        return res.json({
            message:"unauthorized access",
            status:false,
            loginfail:true,
        });
    }
};