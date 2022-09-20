import React from 'react';
import Navbar from './Navbar';
import MatchingTimer from './MatchingTimer';
import { useState, useEffect } from 'react';
import {io} from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import MatchingRoom from "./MatchingRoom"

const MatchingPage = () => {
    // Difficulty selection and confirmation
    const [selection, setSelection] = useState(null);
    const [isConfirm, setConfirmation] = useState(false);
    const [isHigh, setHigh] = useState(false);
    const [isMid, setMid] = useState(false);
    const [isLow, setLow] = useState(false);
    const [showMatchingPage, setShowMatchingPage] = useState(true);
    // Popup and timer
    const [showPopUp, setShowPopUp] = useState(false);
    // Match failed buttons
    const [showMatchFailed, setShowMatchFailed] = useState(false);
    // Create socket.io client
    // const [time, setTime] = React.useState('fetching');
    const socket = io('http://localhost:8001')
    useEffect(()=>{
        socket.on('connect', () => {
            console.log(socket.id)
            socket.emit('salutations', 'salute')
        })
        socket.on('connect_error', ()=>{
          setTimeout(()=>socket.connect(),8001)
        })
    },[])

    const navigate = useNavigate()

    // test code
    socket.on('matchSuccess', elem1 => {
        console.log(elem1)
        // move on to next page
        // roomID => similar to some socket thing
        navigate(MatchingRoom, {
            username : 'John',
            difficulty : selection })
    })
    socket.on('matchFail', () => {
        // reveal reset and retry buttons
        setShowMatchFailed(true);
    })

    // Creates matching page for selection and confirmation
    const handleSelection = (selected) => {
        setSelection(selected);
        if (selected === "high") {
            setHigh(true);
            setMid(false);
            setLow(false);
        } else if (selected === "med") {
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
            setShowMatchingPage(false);
            setShowPopUp(true);
            socket.emit('matching', { username : "John", difficulty : selection })
        } else {
            console.log("selection is null")
        }
    };

    // Change the difficulty
    const handleReset = () => {
        setConfirmation(false);
        setShowPopUp(false);
        setShowMatchingPage(true);
        setShowMatchFailed(false);
    }
    
    // Try matching again
    const handleRepeat = () => {
        setShowMatchFailed(false);
        setShowPopUp(false);
        const refreshTimer = setTimeout(() => {
            setShowPopUp(true);
        }, 1);
        return () => clearTimeout(refreshTimer);
    }

    let matchingpage = null;
    if (showMatchingPage) {
        matchingpage = 
        <div className="content">
            <div className="selection">
                <h1>Make your selection</h1>
                <div className="selectionbuttons">
                    <button disabled={isHigh}className="selectionbutton"onClick={() => handleSelection("high")}>High</button>
                    <button disabled={isMid}className="selectionbutton"onClick={() => handleSelection("med")}>Med</button>
                    <button disabled={isLow}className="selectionbutton"onClick={() => handleSelection("low")}>Low</button>
                </div>
            </div>
            <div className="confirmation">
                <h1>Confirm your selection</h1>
                { !isConfirm && <div className="confirmbuttons">
                    <button className="confirmbutton"onClick={() => handleConfirmation()}>Confirm</button>
                </div>}
            </div>
        </div>
    }

    // Creates popup if confirmation is made after selection
    useEffect (() => {
        if (showPopUp) {
            const timer = setTimeout(() => {
                setShowMatchFailed(true);
                console.log("timed");
            }, 30000);
            
            return () => clearTimeout(timer);
        }
    }, [showPopUp, showMatchFailed]);

    let popup = null;
    if (showPopUp) {
        popup = <div className="popup">
                    <div>
                        <h1>You selected { selection }! Prepare to get matched...</h1>
                    </div>
                    <MatchingTimer/>
                </div>;
    }

    return (  
        <div className="MatchingPage">
            <Navbar />
            {/* { time } */}
            { !isConfirm && matchingpage }
            { isConfirm && popup }
            { showMatchFailed && <div className="matchfailed">
                                <div className="matchfailedbuttons">
                                    <button className="matchfailedbutton"onClick={() => handleReset()}>Change the difficulty</button>
                                    <button className="matchfailedbutton"onClick={()=> handleRepeat()}>Try matching again</button>
                                </div>
                            </div> }
        </div>
    );
}
 
export default MatchingPage;