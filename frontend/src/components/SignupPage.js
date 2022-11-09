import Logo from "../Images/logo.svg";
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
  FormControl,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { URL_USER_SVC } from "../configs";
import {
  STATUS_CODE_BAD_REQUEST,
  STATUS_CODE_CONFLICT,
  STATUS_CODE_CREATED,
} from "../constants";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import styled from "@emotion/styled";
import { borderRadius } from "@mui/system";

const StyledTextField = styled(TextField, {
  shouldForwardProp: (props) => props !== "focusColor",
})((p) => ({
  // input label when focused
  "& label.Mui-focused": {
    color: p.focusColor,
  },
  "& .Mui-error": {
    color: "#3514DC",
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
function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMsg, setDialogMsg] = useState("");
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);
  const [doesUserExist, setDoesUserExist] = useState(false);

  const handleSignup = async () => {
    setIsSignupSuccess(false);
    const res = await axios
      .post(URL_USER_SVC, { username, email, password })
      .catch((err) => {
        console.log(err, err.response.data.message);
        if (err.response.status === STATUS_CODE_BAD_REQUEST) {
          if (err.response.data.message === "Email is in the wrong format!") {
            setErrorDialog(err.response.data, message);
          } else {
            setDoesUserExist(true);
            setErrorDialog(
              "This username already exists. Please login instead"
            );
          }
        } else {
          setErrorDialog("Please try again later");
        }
      });
    if (res && res.status === STATUS_CODE_CREATED) {
      setSuccessDialog("Account successfully created");
      setIsSignupSuccess(true);
    }
  };

  const closeDialog = () => setIsDialogOpen(false);

  const setSuccessDialog = (msg) => {
    setIsDialogOpen(true);
    setDialogTitle("Success");
    setDialogMsg(msg);
  };

  const setErrorDialog = (msg) => {
    setIsDialogOpen(true);
    setDialogTitle("Error");
    setDialogMsg(msg);
  };

  return (
    <div className="background">
      <img src={Logo} alt="logo" id="logo-login" />
      <div id="pop-up-login">
        <Box
          display={"flex"}
          flexDirection={"column"}
          width={"80%"}
          margin={"auto"}
          marginTop={"5%"}
        >
          <h3>Sign up with a username and your email!</h3>
          <h6>
            Already have an account? <a href="/login">Login</a>
          </h6>
          <FormControl sx={{ width: "80%", margin: "auto", marginTop: "3%" }}>
            <StyledTextField
              focusColor="rgba(250, 106, 60, 0.60)"
              label="Username"
              sx={{ marginBottom: "1rem" }}
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
            <StyledTextField
              focusColor="rgba(250, 106, 60, 0.60)"
              label="Email"
              sx={{ marginBottom: "1rem" }}
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
            <StyledTextField
              focusColor="rgba(250, 106, 60, 0.60)"
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ marginBottom: "2rem" }}
            />
          </FormControl>

          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"flex-end"}
          >
            <button className="button-secondary" onClick={handleSignup}>
              Sign up
            </button>
          </Box>

          <Dialog open={isDialogOpen} onClose={closeDialog}>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogContent>
              <DialogContentText>{dialogMsg}</DialogContentText>
            </DialogContent>
            <DialogActions>
              {isSignupSuccess || doesUserExist ? (
                <Button component={Link} to="/login">
                  Log in
                </Button>
              ) : (
                <Button onClick={closeDialog}>Done</Button>
              )}
            </DialogActions>
          </Dialog>
        </Box>
      </div>
    </div>
  );
}

export default SignupPage;
