import React from "react";
import Easy_1 from "../Images/easy_1.png";
import Medium_1 from "../Images/medium_1.png";
import Hard from "../Images/hard_1.png";

import Navbar from "./Navbar";
import NavItem from "./Navitem";
import MatchingTimer from "./MatchingTimer";
import Dropdown from "./Dropdown";
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
  const [roomId, setRoomId] = useState(null);
  const [question, setQuestion] = useState(null);
  const [initialRender, setInitialRender] = useState(false);
  //const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const params = useParams();
  console.log(params);
  const location = useLocation();
  const cookies = location.state && location.state.cookies;
  const jwt = cookies && cookies.cookies && cookies.cookies.jwt;
  let isLoggedIn = jwt;
  const navigate = useNavigate();

  useEffect(() => {
    const socket = io("http://localhost:8001");
    setSocket(socket);
    socket.on("connect", () => {
      if (!initialRender) {
        setInitialRender(true);
      }
    });
    socket.on("connect_error", () => {
      setTimeout(() => socket.connect(), 8001);
    });
    socket.on("matchSuccess", (elem1) => {
      // Navigate to Matching Room
      console.log("Match has succeeded");
      setQuestion(elem1.question);
      setRoomId(elem1.matchedRoomId);
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

  useEffect(() => {
    if (initialRender) {
      navigate("/matchingroom", {
        state: {
          username: username,
          question: question,
          matchedRoomId: roomId,
          cookies: cookies,
        },
      });
    } else {
      // do nothing
      console.log("This is just the initial render!");
    }
  }, [roomId]);

  // Creates matching page for selection and confirmation
  const handleSelection = (selected) => {
    console.log(selected);
    setSelection(selected);
    if (selected === "hard") {
      setHigh(true);
      setMid(false);
      setLow(false);
    } else if (selected === "medium") {
      setHigh(false);
      setMid(true);
      setLow(false);
    } else {
      setHigh(false);
      setMid(false);
      setLow(true);
    }
  };

  useEffect(() => {
    if (initialRender) {
      if (isHigh === true) {
        setSelection("High");
      } else if (isMid === true) {
        setSelection("Med");
      } else if (isLow === true) {
        setSelection("Low");
      }
      console.log(selection);
    } else {
      console.log("This is just the initial render!");
    }
  }, [selection]);

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

  const SelectionButton = (props) => {
    console.log(selection == null);
    return (
      <div
        className="selectionbutton"
        onClick={() => handleSelection(props.type)}
      >
        <img src={props.src} className="difficulty-img" />
        <button
          className={`difficulty_button_${props.type}`}
          disabled={props.disabled}
          onClick={() => handleSelection(props.type)}
        >
          {props.type}
        </button>
      </div>
    );
  };

  let matchingpage = null;
  if (showMatchingPage) {
    matchingpage = (
      <div className="content">
        <div className="selection">
          <h2>What difficulty level do you feel like taking today?</h2>
          <div className="selectionbuttons">
            <SelectionButton
              disabled={isHigh}
              src={Hard}
              type="hard"
            ></SelectionButton>
            <SelectionButton
              disabled={isMid}
              src={Medium_1}
              type="medium"
            ></SelectionButton>
            <SelectionButton
              src={Easy_1}
              disabled={isLow}
              type="easy"
            ></SelectionButton>
          </div>
        </div>
        <div className="confirmation">
          {!isConfirm && (
            <div className="confirmbuttons">
              <button
                className="confirmbutton"
                onClick={() => handleConfirmation()}
                disabled={selection === null}
              >
                {"Start Coding >"}
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
      <Navbar username={params.username}>
        <NavItem type="button" content={params.username[0].toUpperCase()}>
          <Dropdown username={params.username} />
        </NavItem>
        <NavItem
          type="tab"
          link={`/matching/${params.username}`}
          content="Home"
          onClick={() => {
            navigate("/matching/" + params.username, {
              state: { cookies: location.state.cookies },
            });
          }}
        ></NavItem>
      </Navbar>
      <h1 className="title">Welcome Back! {params.username}</h1>
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
    <Dialog open={!isLoggedIn} onClose={closeDialog}>
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
