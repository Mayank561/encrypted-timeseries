const err =  require("../utils/eHandler");
const jwt = require("jsonwebtoken");
const userModel = require("../model/auth");


exports.protectRoute = async (req, res, next)=>{
    let token;
    if(req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
        ){
            token = req.headers.authorization.split(" ")[1];
        }
        if(!token){
            return next(new err("Not authorized to access this route", 401));
        }
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded);
            req.user =await userModel.findById(decoded.id);
            next();
        }catch(error){
            return next(new err("not authorized to access this", 401));
        }
};
exports.authorize = (...roles)=>(req, res, next)=>{
    if(!roles.includes(req,user.role)){
        return next(
            new err(`This user is allowed to perform action, user role: ${req.user.role}`,403)
        )
    }
    next();
};