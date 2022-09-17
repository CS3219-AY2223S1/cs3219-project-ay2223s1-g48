import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { process_match } from "./controller/match-controller.js";
import {
  ormCreateMatch,
  ormCheckEmpty,
  ormPopLatest,
} from "./model/matching-orm.js";

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
    if (await ormCheckEmpty()) {
      // no matches in database
      await ormCreateMatch(data.username, data.difficulty);
    } else {
      // there exists some match in database
      var matched_user = await ormPopLatest();
      console.log(matched_user + " matched with " + data.username);
      // socket.to(/* both sockets */).emit("matchSuccess", matchedRoomId)
    }
  });
});

httpServer.listen(8001);
