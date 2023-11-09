const err = require("../utils/eHandler");
const userModel = require("../model/auth");

exports.registerUser = async(req, res, next)=>{
    try{
        const { name, email, password, role} = req.body;
        const user = await userModel.create({
            name, 
            email,
            password,
        });
        const token = user.getSignedJwtToken();

        res.status(200).json({
            sucess: true,
            token,
        });
    }catch(error){
        next(error);
    }
};

exports.loginUser = async (req, res, next) =>{
    try{
        const { email, password } = req.body;

        if(!email || !password){
            return next(new err("password provide email password", 400));
        }
    const user = await userModel
        .findOne({
            email,
        })
        .select("+password");
    if(!user){
        return next(new err("invalid credentials", 400));
    }
    const isMatch = await user.matchpasswords(password);
    if(!isMatch){
        return next(new err("invalid credentials",400));
    }
    const token = user.getSignedJwtToken();

    res.status(200).json({
        success: true,
        token,
    });    
    }catch(error){
        next(error);
    }
};

exports.getMe = async(req, res, next)=>{
    try{
        const user = await userModel.findById(req.user.id);

        res.status(200).json({
            success: true,
            data: user,
        });
    }catch(error){
        next(error);
    }
};