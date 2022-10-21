import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignupPage from "./components/SignupPage";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import MatchingPage from "./components/MatchingPage";
import MatchingRoom from "./components/MatchingRoom";
import { Box } from "@mui/material";
import React, { Component } from "react";
import QuestionPage from "./components/QuestionPage";
import QuestionUpdate from "./components/QuestionUpdate";
import QuestionCreate from "./components/QuestionCreate";

function App() {
  return (
    <div className="App">
      <Box display={"flex"} flexDirection={"column"} padding={"0"}>
        <Router>
          <Routes>
            <Route exact path="/" element={<LandingPage />}></Route>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home/:username" element={<HomePage />} />
            <Route path="/matchingroom" element={<MatchingRoom />} />
            <Route path="/matching/:username" element={<MatchingPage />} />
            <Route path="/question/" element={<QuestionPage/>}/>
            <Route path="/question/update/:id" element={<QuestionUpdate/>} />
            <Route path="/question/create" element={<QuestionCreate/>} />
          </Routes>
        </Router>
      </Box>
    </div>
  );
}

export default App;
