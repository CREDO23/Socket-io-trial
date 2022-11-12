import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import io from "socket.io-client";

function App() {
  const [user, setUser] = useState("");

  const [message, setMessage] = useState("");

  const [newMessage, setNewMessage] = useState("");

  const [socket, setSocket] = useState(null);
  
  const [chanel,setChanel] = useState('')

  const [to,setTo] = useState('')

  useEffect(() => {
    if (socket) {
      socket.on("new message", (message , id) => {
        setNewMessage(`${message}-${id}`);
      });
    }
       
     
    
  } , [socket]);

  return (
    <div className="App">
      <p>
        {newMessage}
      </p>
      <div>
          <label htmlFor="name">Your name</label>
      <input
        type="text"
        onChange={(e) => {
          setUser(e.target.value);
         
        }}
        name="name"
      />
      <button
          onClick={() => {
           

            if (user) {
              setSocket(io('http://localhost:7000', {
                auth: {
                id : user
              }
              })) 
               socket.emit('newUser' , user)
          } 
        }}
      >
         send your name
      </button>
      <label htmlFor="name">Your Channel</label>
      <input
        type="text"
        onChange={(e) => {
          setChanel(e.target.value);
         
        }}
        name="chanel"
      />
      <button
          onClick={() => {
           

            if (user) {
               socket.emit('join room' , chanel)
          } 
        }}
      >
         send your chanel
      </button>
      <p>
        {newMessage}
      </p>
         <div>
          <label htmlFor="message">Your message</label>
      <input
        type="text"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        name="message"
          />
            <label htmlFor="message">Your target</label>
      <input
        type="text"
        onChange={(e) => {
          setTo(e.target.value);
        }}
        name="message"
          />
      <button
        onClick={() => {
          if(user)  socket.emit('message', message , chanel)
        }}
      >
        send your message
      </button>
      <button
        onClick={() => {
          if(user && to)  socket.emit('private message', message , to)
        }}
      >
        send your private message
      </button>
      </div>
    </div>
    </div>
  );
}

export default App;
