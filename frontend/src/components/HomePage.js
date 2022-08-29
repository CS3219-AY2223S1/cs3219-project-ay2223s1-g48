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
import { useLocation } from "react-router-dom";
const HomePage = () => {
  const { state } = useLocation();
  return (
    <Box>
      <h1>HomePage of {state.username}</h1>
    </Box>
  );
};
export default HomePage;
