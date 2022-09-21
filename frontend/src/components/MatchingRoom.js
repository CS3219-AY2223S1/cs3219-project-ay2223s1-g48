import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const MatchingRoom = () => {
    const navigate = useNavigate()
    const handleReturn = () => {
        navigate("/matching")
    }
    const location = useLocation()
    return ( 
        <div>
            <h1>
                Welcome { location.state.username }, to matching room { location.state.matchedRoomId }!
            </h1>
            <h2>
                <button className="returnButton"onClick={() => handleReturn()}>Return</button>
            </h2>
        </div>
    );
}
 
export default MatchingRoom;