const mongoose = require("mongoose");
const dotenv = require("dotenv");

const connectDB  = async()=>{
    const con = await mongoose.connect(process.env.db_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
    console.log('database connected successfully');
};

module.exports = connectDB;