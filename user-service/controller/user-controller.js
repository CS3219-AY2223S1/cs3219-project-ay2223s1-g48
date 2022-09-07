import { ormCreateUser as _createUser } from "../model/user-orm.js";
import { checkUserName, validateUser } from "../model/repository.js";

export async function createUser(req, res) {
  try {
    const { username, password } = req.body;
    if (username && password) {
      const resp = await _createUser(username, password);
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
        .json({ message: "Username and/or Password are missing!" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Database failure when creating new user!" });
  }
}

export async function logUserIn(req, res) {
  const { username, password } = req.body;

  const userExists = await validateUser({
    username: username,
    password: password,
  });
  console.log(userExists);
  if (!userExists) {
    res.status(401).send("Wrong username or password");
    return;
  }
  console.log(username, password);
  res.status(200).send(`User ${username} successfully logged in`);
}
