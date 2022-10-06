import Logo from "../Images/logo.svg";

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
  FormControl,
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
import { margin } from "@mui/system";
import styled from "@emotion/styled";

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

  const backToLandingPage = () => {
    navigate("/");
  };

  const StyledTextField = styled(TextField, {
    shouldForwardProp: (props) => props !== "focusColor",
  })((p) => ({
    // input label when focused
    "& label.Mui-focused": {
      color: p.focusColor,
    },
    "& .MuiFormLabel-root.Mui-error": {
      color: "#3514DC",
    },

    // focused color for input with variant='standard'
    "& .MuiInput-underline:after": {
      borderBottomColor: p.focusColor,
    },
    // focused color for input with variant='filled'
    "& .MuiFilledInput-underline:after": {
      borderBottomColor: p.focusColor,
    },
    // focused color for input with variant='outlined'
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: p.focusColor,
      },
      "&.Mui-error fieldset": {
        borderColor: "#3514DC",
      },
      "&:hover fieldset": {
        borderColor: "rgba(250, 106, 60, 0.50)",
      },
      "& fieldset": {
        borderColor: "rgba(250, 106, 60, 0.25)",
        borderRadius: "12px",
      },
    },
  }));

  return (
    <div className="background">
      <img src={Logo} alt="logo" id="logo-login" onClick={backToLandingPage} />
      <div id="pop-up-login">
        <Box
          display={"flex"}
          flexDirection={"column"}
          width={"80%"}
          margin={"auto"}
          marginTop={"5%"}
        >
          <h3>Login to start coding and collaborating!</h3>
          <h6>
            New to Peerprep? <a href="/signup">Create new account</a>
          </h6>
          <FormControl sx={{ width: "80%", margin: "auto", marginTop: "3%" }}>
            <StyledTextField
              focusColor="rgba(250, 106, 60, 0.60)"
              label="Email"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ marginBottom: "1rem" }}
              autoFocus
              error={error && error.username ? true : false}
              helperText={
                error && error.username ? "Please enter your username" : ""
              }
              required
            />
            <StyledTextField
              focusColor="rgba(250, 106, 60, 0.60)"
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ marginBottom: "2rem" }}
              error={error && error.password ? true : false}
              required
              helperText={
                error && error.password ? "Please enter your password" : ""
              }
            />
          </FormControl>

          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"flex-end"}
          >
            <button className="button-secondary" onClick={handleLogin}>
              Log In
            </button>
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
      </div>
    </div>
  );
};

export default LoginPage;
