import React,{ useState } from 'react';
import "./Home.scss";
import { Link } from "react-router-dom";

function HomePage({socket}) {
    const [username, setusername] = useState("");
    const [roomname, setroomname] = useState("");

    const sendData = () =>{
        if(username !== "" & roomname !== ""){
            socket.emit('joinRoom', {username, roomname});
        }else{
            alert("username and roomnae are must!");
        }
    };

  return (
    <div className='homePage'>
        <h1> Login Here</h1>
        <input 
        placeholder='Enter your username'
        value = {username}
        onChange={(e)=> setusername(e.target.value)}
        ></input>
        <input placeholder='Enter room naem' value={roomname} onChange={(e)=> setroomname(e.target.value)}
        ></input>
        <Link to={`/chat/${roomname}/${usernmae}`}>
        <button onClick={sendData}>Join</button>
        </Link>
    </div>
  );
}

export default HomePage;