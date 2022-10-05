import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const MatchingRoom = () => {
    const messages = "dummy test"
    const navigate = useNavigate()
    const handleReturn = () => {
        navigate("/matching/" + location.state.username, {
            state: { cookies: location.state.cookies },
          });
    }
    const location = useLocation()
    return (
        <div className="titleandservices">
            <div className="titles">
                <h1>Welcome { location.state.username }, to matching room { location.state.matchedRoomId }!</h1>
                <div className="returnbutton">
                    <button className="returnButton"onClick={() => handleReturn()}>Return</button>
                </div>
            </div>
            <div className="services">
                <div className="collabservice">
                    <textarea className="collab" placeholder="Waiting for coding to start...">
                        
                    </textarea>
                </div>
                <div className="topbottom">
                    <div className="questionservice">
                        <textarea className="question" placeholder="Your question goes here...">

                        </textarea>
                    </div>
                    <div className="communicationservice">
                        <ul className="chatbox">
                            { messages }
                        </ul>
                        <div className="messageinput">
                            <input className="input" type="text" /><button className="send">Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
}
 
export default MatchingRoom;