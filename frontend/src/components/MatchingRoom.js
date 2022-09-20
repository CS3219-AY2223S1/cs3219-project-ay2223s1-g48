import React from "react";
import { useLocation } from "react-router-dom";

const MatchingRoom = () => {
    const location = useLocation()
    return ( 
        <div>
            <h1>
                Welcome { location.state.username }, to matching room { location.state.matchedRoomId }!
            </h1>
            <h2>
            </h2>
        </div>
    );
}
 
export default MatchingRoom;