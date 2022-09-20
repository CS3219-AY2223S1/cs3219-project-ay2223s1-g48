import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import * as matchORM from "./model/matching-orm.js";

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
httpServer.listen(8001);

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000'
  }
});

io.on("connection", (socket) => {
  console.log("listening on :8001");

  socket.on("match", async function (data) {
    //guard clause, check all keys present
    if (
      !(data.hasOwnProperty("username") && data.hasOwnProperty("difficulty"))
    ) {
      throw "data sent does not have required information!";
    }
    const match_exists = await matchORM.checkDifficultyExists(data.difficulty);
    if (match_exists) {
      // there exists some match in database with same difficulty
      const match = await matchORM.popLatestDifficulty(data.difficulty);

      socket.to(socket.id).emit("matchSuccess", matchedRoomId);
      socket.to(match.socketID).emit("matchSuccess", matchedRoomId);
      console.log("matched " + match.username + "at socketID " + match.socketID + " with " + data.username + "at socketID " + socket.id);
      matchedRoomId++;
    } else {
      // no matches in database with same difficulty
      const matchID = await matchORM.createMatch(
        data.username,
        data.difficulty,
        socket.id
      );

      setTimeout(async function () {
        // end of 30s, check if exists in database
        const curr_match_exists = await matchORM.checkIDExists(matchID);
        if (curr_match_exists) {
          // exists in database
          await matchORM.removeByID(matchID);
          socket.to(socket.id).emit("matchFail");
          console.log("match failed for " + data.username);
        } else {
          // does not exist in database, match made
          // do nothing
        }
      }, 30000);
    }
  });
});
