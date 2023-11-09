import React,{ useState, useEffect, useRef} from 'react';
import "./chat.scss";
import {DoDecrypt, DoEncrypt} from "../aes.js";
import {useDispatch} from "react-redux";
import { useDispatch } from "react-redux";
import { process } from "../store/action/index";

function chat1({ username, roomname, socket}) {
    const [text, setText] = useState("");
    const [message, setMessages] = useState([]);

    const dispatch = useDispatch();
    const dispatchProcess = (encrypt, msg, cipher)=>{
        dispatch(process(encrypt, msg, cipher));
    };
    useEffect(()=>{
        socket.on("message",(data)=>{
            const ans = DoDecrypt(data.text, data.username);
            dispatchProcess(false, ans, data.text);
            console.log(ans);
            let temp = message;
            temp.push({
                userId: data.userId,
                username: data.username,
                text: ans,
            });
            setMessages([...temp]);
            
        });

    },[socket]);
    const sendData = () =>{
        if( text !== ""){
            const and = DoEncrypt(text);
            socket.emit("chat",ans);
            setText("");
        }
    };
    const messageEndRef = useRef(null);
    const scrollToBottom = () =>{
        messageEndRef.current.scrollToView({behavior: "smooth"});
    };
    useEffect(scrollToBottom, [message]);
    console.log(message,"mess");
  return (
    <div className='chat'>
        <div className='user-name'>
            <h2>
                {username} <span style={({fontSize: "0.7rem"})}>in {roomname}</span>
            </h2>
        </div>
        <div className='chat-message'>
            {message.map((i)=>{
                if(i.username === username){
                    return(
                        <div className='message'>
                        <p>{i.text}</p>
                        <span>{i.username}</span>
                        </div>
                    );
                }else{
                    return(
                        <div className='message mess-right'>
                        <p>{i.text}</p>
                        <span>{i.username}</span>
                        </div>
                    );
                }
            })}
            <div ref={messageEndRef}/>
        </div>
        <div className='send'>
            <input placeholder='enter your message' value={text} onChange={(e)=>setText(e.target.value)}
            onKeyDown={(e)=>{
                if(e.key === "Enter"){
                    sendData();
                }
            }}
            ></input>
            <button onClick={sendData}>Send</button>
        </div>
    </div>
  );
}
export default chat1;