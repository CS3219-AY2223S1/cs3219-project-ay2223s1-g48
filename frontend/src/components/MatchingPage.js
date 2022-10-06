import React from "react";
import Navbar from "./Navbar";
import MatchingTimer from "./MatchingTimer";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import MatchingRoom from "./MatchingRoom";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";

const MatchingPage = () => {
  // User information
  const [username, setUsername] = useState(window.location.pathname.slice(10));
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
  const [socket, setSocket] = useState(null);
  const params = useParams();
  const location = useLocation();
  const cookies = location.state && location.state.cookies;
  const jwt = cookies && cookies.cookies && cookies.cookies.jwt;
  let isLoggedIn = jwt;
  console.log("jwt: ", jwt);
  const navigate = useNavigate();

  useEffect(() => {
    const socket = io("http://localhost:8001");
    setSocket(socket);
    socket.on("connect", () => {
      console.log(socket.id);
    });
    socket.on("connect_error", () => {
      setTimeout(() => socket.connect(), 8001);
    });
    socket.on("matchSuccess", (elem1) => {
      // Navigate to Matching Room
      console.log("Match has succeeded");
      navigate("/matchingroom", {
        state: { username: username, matchedRoomId: elem1, cookies: cookies },
      });
    });
    socket.on("matchFail", () => {
      console.log("Match has failed");
      // reveal reset and retry buttons
      setShowMatchFailed(true);
    });
    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.off("matchSuccess");
      socket.off("matchFail");
    };
  }, [setSocket]);

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
      setConfirmation(true);
      setShowMatchingPage(false);
      setShowPopUp(true);
      socket.emit("match", { username: username, difficulty: selection });
    } else {
      // You should not have selection == null
    }
  };

  // Change the difficulty
  const handleReset = () => {
    setConfirmation(false);
    setShowPopUp(false);
    setShowMatchingPage(true);
    setShowMatchFailed(false);
  };

  // Try matching again
  const handleRepeat = () => {
    setShowMatchFailed(false);
    setShowPopUp(false);
    socket.emit("match", { username: username, difficulty: selection });
    const refreshTimer = setTimeout(() => {
      setShowPopUp(true);
    }, 1);
    return () => clearTimeout(refreshTimer);
  };

  const closeDialog = () => {
    navigate("/login");
  };

  let matchingpage = null;
  if (showMatchingPage) {
    matchingpage = (
      <div className="content">
        <div className="selection">
          <h1>Make your selection</h1>
          <div className="selectionbuttons">
            <button
              disabled={isHigh}
              className="selectionbutton"
              onClick={() => handleSelection("high")}
            >
              High
            </button>
            <button
              disabled={isMid}
              className="selectionbutton"
              onClick={() => handleSelection("med")}
            >
              Med
            </button>
            <button
              disabled={isLow}
              className="selectionbutton"
              onClick={() => handleSelection("low")}
            >
              Low
            </button>
          </div>
        </div>
        <div className="confirmation">
          <h1>Confirm your selection</h1>
          {!isConfirm && (
            <div className="confirmbuttons">
              <button
                className="confirmbutton"
                onClick={() => handleConfirmation()}
              >
                Confirm
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  let popup = null;
  if (showPopUp) {
    popup = (
      <div className="popup">
        <div>
          <h1>You selected {selection}! Prepare to get matched...</h1>
        </div>
        <MatchingTimer />
      </div>
    );
  }

  return isLoggedIn ? (
    <div className="MatchingPage">
      <Navbar params />
      {!isConfirm && matchingpage}
      {isConfirm && popup}
      {showMatchFailed && (
        <div className="matchfailed">
          <div className="matchfailedbuttons">
            <button className="matchfailedbutton" onClick={() => handleReset()}>
              Change the difficulty
            </button>
            <button
              className="matchfailedbutton"
              onClick={() => handleRepeat()}
            >
              Try matching again
            </button>
          </div>
        </div>
      )}
    </div>
  ) : (
    <Dialog open={!jwt} onClose={closeDialog}>
      <DialogTitle>Unauthorised</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You are not authorised. Please login instead
        </DialogContentText>
      </DialogContent>
      <DialogActions>{<Button onClick={closeDialog}>OK</Button>}</DialogActions>
    </Dialog>
  );
};

export default MatchingPage;
