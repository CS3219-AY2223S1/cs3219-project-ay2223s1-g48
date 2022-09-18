import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import {
  createMatch,
  popLatest,
  checkExists,
  checkDifficultyExists,
  popLatestDifficulty,
} from "./model/matching-orm.js";

var matchedRoomId = 0;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options("*", cors());

app.get("/", (req, res) => {
  res.send("Hello World from matching-service");
});

const httpServer = createServer(app);

const io = new Server(httpServer, {
  /* options */
});

io.on("connection", (socket) => {
  console.log("listening on :8001");

  socket.on("match", async function (data) {
    if (await checkDifficultyExists(data.difficulty)) {
      // there exists some match in database with same difficulty
      const socketID = await popLatestDifficulty(data.difficulty);
      socket.to(socketID).emit("matchSuccess", matchedRoomId);
      socket.to(socketID).emit("matchSuccess", matchedRoomId);
      console.log("matched " + socketID + " with " + socket.id);
      matchedRoomId++;
    } else {
      // no matches in database with same difficulty
      await createMatch(data.username, data.difficulty, socket.id);

      // set 30s timer
      // end of 30s,
      // emit match fail event
    }
  });
});

httpServer.listen(8001);
