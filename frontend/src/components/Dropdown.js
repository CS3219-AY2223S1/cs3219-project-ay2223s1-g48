import { CSSTransition } from "react-transition-group";
import { useState } from "react";
import { URL_USER_SVC } from "../configs";
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
import {
  STATUS_CODE_BAD_REQUEST,
  STATUS_CODE_CONFLICT,
  STATUS_CODE_CREATED,
} from "../constants";

import axios from "axios";

const Dropdown = (props) => {
  const [activeMenu, setActiveMenu] = useState("main"); //account
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMsg, setDialogMsg] = useState("");
  const [action, setAction] = useState(null);
  const [isErr, setIsErr] = useState(false);

  const DropdownItem = (props) => {
    return (
      <a
        href={props.link}
        className="dropdown-item"
        onClick={() => {
          if (props.action === "Change Password") {
            setAction(props.action);
            setDialogMsg("Enter your password and new password below");
            setDialogTitle("Changing your password");
            setIsDialogOpen(true);
          } else if (props.action === "Delete Account") {
            setAction(props.action);
            setDialogMsg("Enter your password to delete your account");
            setDialogTitle("This action is irreversible!");
            setIsDialogOpen(true);
          } else {
            props.goToMenu && setActiveMenu(props.goToMenu);
          }
        }}
      >
        {props.leftIcon ? (
          <span className="left-icon">{props.leftIcon}</span>
        ) : (
          ""
        )}
        {props.children}
        {props.rightIcon ? (
          <span className="right-icon">{props.rightIcon}</span>
        ) : (
          ""
        )}
      </a>
    );
  };
  const handleDeleteAccount = async () => {
    const username = props.username;
    const res = await axios
      .delete(URL_USER_SVC, { username, password })
      .catch((err) => {
        console.log(err.response.status);
        if (err.response.status === STATUS_CODE_BAD_REQUEST) {
          setIsErr(true);
          setDialogMsg("");
          setDialogTitle(
            "Unable to delete your account now, please try again later"
          );
        }
      });
  };
  const handleChangePassword = async () => {
    const username = props.username;
    const res = await axios
      .patch(URL_USER_SVC, {
        username,
        password,
        newPassword,
      })
      .catch((err) => {
        console.log(err.response.status);
        if (err.response.status === STATUS_CODE_BAD_REQUEST) {
          setIsErr(true);
          setDialogMsg("");
          setDialogTitle(
            "Password change unsuccessful, please try again later"
          );
        }
      });
  };
  const closeDialog = () => {
    setIsDialogOpen(false);
    setIsErr(false);
  };

  return isDialogOpen ? (
    <Dialog open={isDialogOpen} onClose={closeDialog}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>{dialogMsg}</DialogContentText>

        {!isErr && (
          <FormControl sx={{ width: "80%", margin: "auto", marginTop: "3%" }}>
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              label="enter your password"
              sx={{ marginBottom: "2rem" }}
              type="password"
              required
            ></TextField>

            {action === "Change Password" && (
              <TextField
                onChange={(e) => setNewPassword(e.target.value)}
                label="Enter your new password"
                type="password"
                required
              ></TextField>
            )}
          </FormControl>
        )}
      </DialogContent>
      <DialogActions>
        {!isErr && (
          <Button
            onClick={() => {
              action === "Delete Account"
                ? handleDeleteAccount()
                : handleChangePassword();
            }}
          >
            {action}
          </Button>
        )}

        <Button onClick={closeDialog}>{isErr ? "Ok" : "Cancel"}</Button>
      </DialogActions>
    </Dialog>
  ) : (
    <div className="dropdown">
      <CSSTransition
        in={activeMenu === "main"}
        unmountOnExit
        timeout={500}
        classNames="menu-primary"
      >
        <div className="menu">
          <DropdownItem rightIcon={">"} goToMenu="account">
            My Account
          </DropdownItem>
          <DropdownItem link="/login">Log Out</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "account"}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
      >
        <div className="menu">
          <DropdownItem action="Change Password">Change Password</DropdownItem>
          <DropdownItem action="Delete Account">Delete Account</DropdownItem>
          <DropdownItem leftIcon={"<"} goToMenu="main">
            Back
          </DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
};

export default Dropdown;
