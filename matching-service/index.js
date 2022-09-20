import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

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

  socket.on('salutations', elem1 => {
    console.log(elem1);
  })

  socket.timeout(5000).on('matching', elem1 => {
    console.log(elem1);
    setTimeout(async function () {
      socket.emit("matchSuccess");
    }, 5000);
  })
});
