import {
  ormCreateUser as _createUser,
  ormPatchUser as _patchUser,
  ormDeleteUser as _deleteUser,
  validateUser,
} from "../model/user-orm.js";

const EMAILREGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export async function createUser(req, res) {
  try {
    const { username, email, password } = req.body;
    // console.log(username, email, password);
    if (!EMAILREGEX.test(email)) {
      return res.status(400).json({ message: 'Email is in the wrong format!' });
    }
    if (username && password && email) {
      const resp = await _createUser(username, email, password);
      console.log(resp);
      if (resp.err) {
        return res
          .status(400)
          .json({ message: "Could not create a new user!" });
      } else {
        console.log(`Created new user ${username} successfully!`);
        return res
          .status(201)
          .json({ message: `Created new user ${username} successfully!` });
      }
    } else {
      return res
        .status(400)
        .json({ message: "Username, Email and/or Password are missing!" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Database failure when creating new user!" });
  }
}

export async function logUserIn(req, res) {
  const { username, password } = req.body;
  const token = await validateUser({
    username: username,
    password: password,
  });
  console.log(token);
  if (!token) {
    res.status(401).send("Wrong username or password");
    return;
  }
  console.log(username, password);
  res
    .status(200)
    .header("x-jwt", token)
    .send({ message: `User ${username} successfully logged in`, jwt: token });
}

export async function patchUser(req, res) {
  try {
    const { username, password, newPassword } = req.body;
    if (username && password) {
      const resp = await _patchUser(username, password, newPassword);
      console.log(resp);
      if (resp.err) {
        return res.status(400).json({ message: "Could not change password!" });
      } else {
        console.log("Password changed successfully!");
        return res
          .status(200)
          .json({ message: "Password changed successfully!" });
      }
    } else {
      return res
        .status(400)
        .json({ message: "Username and/or Password are missing!" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Database failure when updating password!" });
  }
}

export async function deleteUser(req, res) {
  const { username, password } = req.body;
  try {
    console.log("deleting account: ", username, password);
    if (username && password) {
      const resp = await _deleteUser(username, password);
      console.log(resp);
      if (resp.err) {
        return res.status(400).json({ message: "Could not delete account" });
      } else {
        console.log("Account deleted successfully!");
        return res
          .status(200)
          .json({ message: "Account deleted successfully!" });
      }
    } else {
      return res
        .status(400)
        .json({ message: "Username and/or Password are missing" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Database failure when deleting account!" });
  }
}

export async function getUser(req, res) {}
