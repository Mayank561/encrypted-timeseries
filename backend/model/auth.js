const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please add your name"],
    },
    email:{
        type: String,
        required: [true, "pleass add your email"],
        unique: true,
        match: [
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "please add an valid email",
          ],
    },
    password:{
        type: String,
        required: [true],
        minLenght: 6,
        select: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt:{
        type: Date,
        default: Date.now,
    },

});
UserSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.getSignedJWTToken = function(){
    return jwt.sign({ id : this._id }, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE,
    });
};

UserSchema.methods.matchpasswords = async function (enteredPassword){
    return await  bcrypt.compare(enteredPassword, this.password);
};
UserSchema.methods.getResetToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    return resetToken;
}
module.exports = mongoose.model("User", UserSchema);