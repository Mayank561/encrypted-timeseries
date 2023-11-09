const express = require("express");
const dotenv = require("dotenv");
const app = express();
const socket = require('socket.io');
const morgan = require('morgan');
const cors = require('cors');
const connetDB = require('./config/mongoose');
const { getCurrentUser, userLeave, userJoin } = require("./model/dummyU");
const error = require("./middleware/error");
dotenv.config({path: "../backend/config/config.env"});

const auth = require("./routes/auth");

app.use(morgan("dev"));
app.use(express.json());
app.use("/api/v1/auth", auth);
app.use(error);
connetDB;

const port = process.env.PORT || 5000;

app.use(cors());
var server = app.listen(
    port,
    console.log(
        `server is running is ${process.env.NODE_ENV} on port ${process.env.PORT}`
    )
);
process.on("unhandle", (err, Promise)=>{
    console.log(`Error : ${err.message}`);
    server.close(()=> process.exit(1));
});

const io = socket(server);

io.on("connection",(socket)=>{
    socket.on("joinRoom", ({username, roomname})=>{
        const user = userJoin(socket.id, username, roomname);
        console.log(socket.io, "=id");
        socket.join(user.room);


        socket.emit("message",{
            userId: user.id,
            username: user.username,
            text: `Welcome ${user.username}`,
        });

        socket.broadcast.to(user.room).emit("message",{
            userId: user.id, 
            username: user.username,
            text: `${user.username} has joined the chat`,
        });
    });

    socket.on("chat",(text)=>{
        const user = getCurrentUser(socket.id);

        io.to(user.room).emit("message",{
            userId: user.id,
            username: user.username,
            text: text,
        });
    });
    socket.on("dissconnect",()=>{
        const user = userLeave(socket.id);

        if(user){
            io.to(user.room).emit("message",{
                userId : user.id,
                username: user.username,
                text: `${user.username} has left the chat`,
            });
        }
    });
});