import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Editor from "./Editor.js";

const MatchingRoom = () => {
  const messages = "dummy test";
  const question = "dummy question";
  const navigate = useNavigate();
  const handleReturn = () => {
    navigate("/matching/" + location.state.username, {
      state: { cookies: location.state.cookies },
    });
  };
  const location = useLocation();
  return (
    <div className="titleandservices">
      <div className="titles">
        <h1>
          Welcome {location.state.username}, to matching room{" "}
          {location.state.matchedRoomId}!
        </h1>
        <div className="returnbutton">
          <button className="returnButton" onClick={() => handleReturn()}>
            Return
          </button>
        </div>
      </div>
      <div className="services">
        <div className="collabservice">
          <Editor
            className="collab"
            matchedRoomId={location.state.matchedRoomId}
            username={location.state.username}
          />
          {/* <textarea
            className="collab"
            placeholder="Waiting for coding to start..."
          ></textarea> */}
        </div>
        <div className="topbottom">
          <div className="questionservice">
            <ul className="question">{question}</ul>
          </div>
          <div className="communicationservice">
            <ul className="chatbox">{messages}</ul>
            <div className="messageinput">
              <input className="input" type="text" />
              <button className="send">Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchingRoom;
