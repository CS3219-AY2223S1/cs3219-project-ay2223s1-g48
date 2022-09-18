import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import {
  ormCreateMatch,
  ormPopLatest,
  ormCheckExists,
  ormCheckDifficultyExists,
  ormPopLatestDifficulty,
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
    if (await ormCheckDifficultyExists(data.difficulty)) {
      // there exists some match in database with same difficulty
      var matched_sid = await ormPopLatestDifficulty(data.difficulty);
      socket.to(matched_sid).emit("matchSuccess", matchedRoomId);
      socket.to(socket.id).emit("matchSuccess", matchedRoomId);
      console.log("matched " + matched_sid + " with " + socket.id);
      matchedRoomId++;
    } else {
      // no matches in database with same difficulty
      await ormCreateMatch(data.username, data.difficulty, socket.id);
    }
  });
});

httpServer.listen(8001);
