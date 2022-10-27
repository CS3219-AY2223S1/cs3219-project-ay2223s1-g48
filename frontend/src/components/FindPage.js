import Logo from "../Images/logo.svg";
import { Box, TextField, FormControl } from "@mui/material";
import { useState } from "react";

import React from "react";
import styled from "@emotion/styled";

function FindPage() {
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [doesEmailExist, setDoesEmailExist] = useState(false);

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

  const sendEmail = () => {
    //TODO: send email
    setIsEmailSent(true);
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
          <h3>Please enter your email</h3>
          <h6>
            <a href="/login">Back to Login</a>
          </h6>
          <FormControl sx={{ width: "80%", margin: "auto", marginTop: "3%" }}>
            <StyledTextField
              focusColor="rgba(250, 106, 60, 0.60)"
              label="Email"
              sx={{ marginBottom: "1rem" }}
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
          </FormControl>
          {isEmailSent ? (
            <h6>
              An email containing your login credentials have been sent to you.
              Please check your email and <a href="/login">login</a>
            </h6>
          ) : (
            <h6></h6>
          )}

          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"flex-end"}
          >
            <button className="button-secondary" onClick={sendEmail}>
              Send email
            </button>
          </Box>
        </Box>
      </div>
    </div>
  );
}

export default FindPage;
