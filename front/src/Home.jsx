import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import io from "socket.io-client";

function App() {
  const [user, setUser] = useState("");

  const [message, setMessage] = useState("");

  const [newMessage, setNewMessage] = useState("");

  const [socket, setSocket] = useState(null);
  
  const [to,setTo] = useState('')

  useEffect(() => {
    if (socket) {
      socket.on("new message", (message) => {
        setNewMessage(message);
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
             <label htmlFor="to">Target</label>
      <input
        type="text"
        onChange={(e) => {
          setTo(e.target.value);
        }}
        name="to"
      />
      <button
        onClick={() => {
          if(user)  socket.emit('message', message , to)
        }}
      >
        send your message
      </button>
      </div>
    </div>
    </div>
  );
}

export default App;
