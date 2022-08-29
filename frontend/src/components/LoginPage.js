import React from "react";
import { useState } from "react";
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
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import { URL_USER_SVC } from "../configs";
import {
  STATUS_CODE_CONFLICT,
  STATUS_CODE_LOGIN_SUCCESSFUL,
} from "../constants";
import { Link } from "react-router-dom";
import HomePage from "./HomePage";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginSuccess, setIsLoginSucess] = useState(true);

  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await axios
      .post(`${URL_USER_SVC}/auth`, { username, password })
      .catch((err) => {
        if (err.response.status === STATUS_CODE_CONFLICT) {
        } else {
        }
      });

    if (res && res.status === STATUS_CODE_LOGIN_SUCCESSFUL) {
      setIsLoginSucess(true);
    }
    if (isLoginSuccess) {
      navigate(`/home`, { state: { username: username } });
    }
  };
  return (
    <Box display={"flex"} flexDirection={"column"} width={"30%"}>
      <Typography variant={"h3"} marginBottom={"2rem"}>
        Login
      </Typography>

      <TextField
        label="Username"
        variant="standard"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{ marginBottom: "1rem" }}
        autoFocus
      />
      <TextField
        label="Password"
        variant="standard"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ marginBottom: "2rem" }}
      />
      <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
        <Button variant={"outlined"} onClick={handleLogin}>
          Log In
        </Button>
      </Box>
      <Routes>
        <Route path="/home" render={() => <HomePage username={username} />} />
      </Routes>
    </Box>
  );
};

export default LoginPage;
