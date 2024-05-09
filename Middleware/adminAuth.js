const jwt = require ("jsonwebtoken"); 
const AdminModel=require("../Model/AdminModel")
module.exports=async(req,res,next)=>{
    try{
        const authHeader = req.headers.authorization;
        console.log(authHeader,"middleware one");
        const authToken=authHeader && authHeader.split(" ")[1];
        console.log(authToken,"middleware two");
        if(!authToken){
            return res.json({
                loginfail: true,
                status:false,
                message:"No auth token",
            });
        }
        const decode = jwt.verify(authToken,"JWT");
        const admin= await AdminModel.findOne({_id: decode.id});
        if(!admin){
            return res.json({
                message:"unauthorized access",
                status:false,
                loginfail:true,
            });
        }
        req.admin= admin;
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