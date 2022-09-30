import React from "react";
import { useState } from "react";
import Cookies from "universal-cookie";
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
  STATUS_CODE_LOGIN_FAILED,
  STATUS_CODE_LOGIN_SUCCESSFUL,
} from "../constants";
import { Link } from "react-router-dom";
import HomePage from "./HomePage";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginSuccess, setIsLoginSucess] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMsg, setDialogMsg] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const setErrorDialog = (msg) => {
    setIsDialogOpen(true);
    setDialogTitle("Something went wrong :(");
    setDialogMsg(msg);
  };

  const closeDialog = () => setIsDialogOpen(false);

  const validate = () => {
    let temp = {};
    if (!username) {
      temp.username = "Username is required";
    }
    if (!password) {
      temp.password = "Password is required";
    }
    setError(temp);
  };

  const handleLogin = async () => {
    validate();
    if (!password || !username) {
      //setErrorDialog("Please enter your username and password");
      return;
    }
    const res = await axios
      .post(`${URL_USER_SVC}/auth`, { username, password })
      .catch((err) => {
        if (err.response.status === STATUS_CODE_LOGIN_FAILED) {
          setErrorDialog("Wrong username or password!");
        } else {
          setErrorDialog("Please try again later!");
        }
        return;
      });

    if (res && res.status === STATUS_CODE_LOGIN_SUCCESSFUL) {
      //setIsLoginSucess(true);
      //if (isLoginSuccess) {
      console.log(res);
      const jwt = res.data.jwt;
      const cookies = new Cookies();
      cookies.set("jwt", jwt, { httpOnly: true });
      console.log(cookies);
      navigate(`/matching/${username}`, {
        state: { cookies: cookies },
      }); //delete state if no need in the future
      //}
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
        error={error && error.username ? true : false}
        helperText={error && error.username ? "Please enter your username" : ""}
        required
      />
      <TextField
        label="Password"
        variant="standard"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ marginBottom: "2rem" }}
        error={error && error.password ? true : false}
        required
        helperText={error && error.password ? "Please enter your password" : ""}
      />
      <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
        <Button variant={"outlined"} onClick={handleLogin}>
          Log In
        </Button>
      </Box>

      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogMsg}</DialogContentText>
        </DialogContent>
        <DialogActions>
          {<Button onClick={closeDialog}>OK</Button>}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LoginPage;
