import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import MatchingPage from "./components/MatchingPage";
import MatchingRoom from "./components/MatchingRoom";
import { Box } from "@mui/material";
import React, { Component } from "react";

function App() {
  return (
    <div className="App">
      <Box display={"flex"} flexDirection={"column"} padding={"4rem"}>
        <Router>
          <Routes>
            <Route
              exact
              path="/"
              element={<Navigate replace to="/signup" />}
            ></Route>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home/:username" element={<HomePage />} />
            <Route path="/matchingroom" element={<MatchingRoom />} />
            <Route path="/matching/:username" element={<MatchingPage />} />
          </Routes>
        </Router>
      </Box>
    </div>
  );
}

export default App;
