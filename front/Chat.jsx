import { useState, useEffect } from "react";
import "./App.css";


function App({socket}) {
  const [user, setUser] = useState("");

  const [message, setMessage] = useState("");

  const [newMessage, setNewMessage] = useState("");
  

   

  useEffect(() => {
    if (user) {
        socket.on("new message", (message) => {
        setNewMessage(message);
      });
      }
      
    
  } , []);

  return (
    <div className="App">
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
      <button
        onClick={() => {
          if(user)  socket.emit('message', message)
        }}
      >
        send your message
      </button>
      </div>
    </div>
  );
}

export default App;
