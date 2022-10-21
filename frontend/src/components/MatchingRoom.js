import React from "react";
import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { renderMatches, useLocation, useNavigate } from "react-router-dom";

const MatchingRoom = () => {
  const navigate = useNavigate()
  const didMount = useRef(true)
  const location = useLocation()
  const [messages, setMessages] = useState("Session started: " + Date().toLocaleString() + "\n")
  const [question, setQuestion] = useState(location.state.question)
  const [input, setInput] = useState('')
  const [incoming, setIncoming] = useState('')
  const [counter, setCounter] = useState(1)
  const [socket, setSocket] = useState();

  useEffect(() => {
    const socket = io("http://localhost:8081");
    
    setSocket(socket);
    socket.on("connect", () => {
      socket.emit("joinRoom", { roomId: location.state.matchedRoomId });
    });
    socket.on("connect_error", () => {
      setTimeout(() => socket.connect(), 8081);
    });
    socket.on("setUsername", (data) => {
      socket.username = location.state.username;
      console.log(socket.username);
    });
    socket.on("receiveMessage", (data) => {
      setIncoming("[" + data.counter + "] " + data.username + ": " + data.input);
      setCounter(data.counter + 1);
      var chatHistory = document.getElementById("chatbox");
      chatHistory.scrollTop = chatHistory.scrollHeight;
    });
    socket.on("userDisconnect", (data) => {
      setIncoming("[The other user has disconnected unexpectedly!]");
      var chatHistory = document.getElementById("chatbox");
      chatHistory.scrollTop = chatHistory.scrollHeight;
    });
    socket.on("disconnect", (reason) => {
      setIncoming("[The Communication Service Server has gone down!]");
      var chatHistory = document.getElementById("chatbox");
      chatHistory.scrollTop = chatHistory.scrollHeight;
    })
    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.off("setUsername");
      socket.off("receiveMessage");
      socket.off("userDisconnect");
    };
  }, []);

  useEffect(() => {
    if (didMount.current) {
      didMount.current = false;
    } else {
      setMessages(messages + "\n" + incoming);
    }
  }, [incoming])
  
  const handleReturn = () => {
    setCounter(counter + 1);
    socket.emit("sendMessage", { username: location.state.username, input: "Thanks for the session! (Left the room)", roomId: location.state.matchedRoomId, counter: counter });
    setInput('');
    navigate("/matching/" + location.state.username, {
      state: { cookies: location.state.cookies },
    });
  }
  const handleChange = event => {
    setInput(event.target.value);
    // console.log('value is:', event.target.value)
  }
  const handleSend = () => {
    socket.emit("sendMessage", { username: location.state.username, input: input, roomId: location.state.matchedRoomId, counter: counter });
    setInput('');
    const chatHistory = document.getElementById("chatbox");
    chatHistory.scrollTop = chatHistory.scrollHeight;
  }

  return (
    <div className="titleandservices">
      <div className="titles">
        <h1>Welcome { location.state.username }, to matching room { location.state.matchedRoomId }!</h1>
        <div className="returnbutton">
          <button className="returnButton" onClick={() => handleReturn()}>Return</button>
        </div>
      </div>
      <div className="services">
        <div className="collabservice">
          <textarea className="collab" placeholder="Waiting for coding to start...">
              
          </textarea>
        </div>
        <div className="topbottom">
          <div className="questionservice">
            <ul className="question">
              { question }
            </ul>
          </div>
          <div className="communicationservice">
            <ul id="chatbox" className="chatbox">
              { messages }
            </ul>
            <div className="messageinput">
              <input className="input" type="text" onChange={handleChange} value={input}/><button className="send" onClick={()=>handleSend()}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default MatchingRoom;