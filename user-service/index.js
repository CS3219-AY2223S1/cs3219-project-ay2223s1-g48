import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.use(cookieParser());
app.options("*", cors());
import {
  createUser,
  logUserIn,
  patchUser,
  deleteUser,
  getUser,
} from "./controller/user-controller.js";

const router = express.Router();

if (!process.env.JWT_PRIVATE_KEY) {
  console.log(
    "FATAL ERROR: JWT_PRIVATE_KEY is not set. \nPlease add it into .env file OR run 'export JWT_PRIVATE_KEY=<inser any characters>' once in terminal"
  );
  process.exit(1);
}

// Controller will contain all the User-defined Routes
router.get("/", (_, res) => res.send("Hello World from user-service"));
router.post("/", createUser);
router.patch("/", patchUser);
router.delete("/", deleteUser);
router.post("/", createUser);
router.post("/auth", logUserIn);
router.get("/validate", getUser);

app.use("/api/user", router).all((_, res) => {
  res.setHeader("content-type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
});

app.listen(process.env.PORT || 8000, () => console.log("user-service listening on port 8000"));
