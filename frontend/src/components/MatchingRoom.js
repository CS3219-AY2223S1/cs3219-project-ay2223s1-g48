import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const MatchingRoom = () => {
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
                <div className="title">
                    Welcome { location.state.username }, to matching room { location.state.matchedRoomId }!
                </div>
                <div className="returnbutton">
                    <button className="returnButton"onClick={() => handleReturn()}>Return</button>
                </div>
            </div>
            <div className="services">
                <div className="collabservice">
                    <textarea name="collab" cols="30" rows="10" placeholder="Waiting for coding to start...">
                        
                    </textarea>
                </div>
                <div className="topbottom">
                    <div className="questionservice">
                        <textarea name="question" cols="30" rows="10" placeholder="Your question goes here...">

                        </textarea>
                    </div>
                    <div className="communicationservice">
                        <textarea name="communication" cols="30" rows="10" placeholder="Waiting for someone to speak...">

                        </textarea>
                    </div>
                </div>
            </div>
        </div>
        
    );
}
 
export default MatchingRoom;