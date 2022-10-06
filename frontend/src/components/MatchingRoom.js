import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const MatchingRoom = () => {
    const [messages, setMessages] = useState("Session started: " + Date().toLocaleString())
    const [question, setQuestion] = useState("dummy question")
    const navigate = useNavigate()
    const handleReturn = () => {
        navigate("/matching/" + location.state.username, {
            state: { cookies: location.state.cookies },
          });
    }
    const [input, setInput] = useState('')
    const handleChange = event => {
        setInput(event.target.value);
        // console.log('value is:', event.target.value)
    }
    const handleSend = () => {
        setMessages(messages + "\n" + location.state.username + ": " + input)
        setInput('')
    }
    const location = useLocation()
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
                        <ul className="chatbox">
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