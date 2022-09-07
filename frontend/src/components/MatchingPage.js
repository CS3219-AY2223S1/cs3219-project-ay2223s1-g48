import React from 'react';
import Navbar from './Navbar';
import { useState } from 'react';

const MatchingPage = () => {
    const [selection, setSelection] = useState(null);
    const [isConfirm, setConfirmation] = useState(false);
    const [isHigh, setHigh] = useState(false);
    const [isMid, setMid] = useState(false);
    const [isLow, setLow] = useState(false);

    const handleSelection = (selected) => {
        setSelection(selected);
        if (selected === "high") {
            setHigh(true);
            setMid(false);
            setLow(false);
        } else if (selected === "mid") {
            setHigh(false);
            setMid(true);
            setLow(false);
        } else {
            setHigh(false);
            setMid(false);
            setLow(true);
        }
    };

    const handleConfirmation = () => {
        if (selection !== null) {
            console.log("selection is not null");
            setConfirmation(true);
        } else {
            console.log("selection is null")
        }
    };

    return (  
        <div className="MatchingPage">
            <Navbar />
            <div className="content">
                <div className="selection">
                    <h1>Make your selection</h1>
                    <div className="selectionbuttons">
                        <button disabled={isHigh}className="selectionbutton"onClick={() => handleSelection("high")}>High</button>
                        <button disabled={isMid}className="selectionbutton"onClick={() => handleSelection("mid")}>Mid</button>
                        <button disabled={isLow}className="selectionbutton"onClick={() => handleSelection("low")}>Low</button>
                    </div>
                </div>
                <div className="confirmation">
                    <h1>Confirm your selection</h1>
                    { !isConfirm && <div className="confirmbuttons">
                        <button className="confirmbutton"onClick={() => handleConfirmation()}>Confirm</button>
                    </div>}
                    { isConfirm && 
                    <div className="matchstartmessage">
                        <p>You selected { selection }! Prepare to get matched...</p>
                    </div>}                    
                </div>
            </div>
        </div>
    );
}
 
export default MatchingPage;