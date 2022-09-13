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
import { useLocation, useParams } from "react-router-dom";
const HomePage = () => {
  const { state } = useLocation();
  const params = useParams();
  return (
    <Box>
      <h1>HomePage of {params.username}</h1>
    </Box>
  );
};
export default HomePage;
