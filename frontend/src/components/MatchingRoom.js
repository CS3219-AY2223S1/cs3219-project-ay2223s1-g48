import { Route } from "react-router-dom";
import { useState } from 'react';

const MatchingRoom = (route) => {
    const { username, difficulty  }= route.params
    const [usernameStr, setUsernameStr] = useState(JSON.stringify(username));
    const [difficultyStr, setDifficultyStr] = useState(JSON.stringify(difficulty));
    return ( 
        <div>
            <h1>
                Welcome { usernameStr }!
            </h1>
            <h2>
                You selected { difficultyStr }. Prepare to answer the question!
            </h2>
        </div>
    );
}
 
export default MatchingRoom;