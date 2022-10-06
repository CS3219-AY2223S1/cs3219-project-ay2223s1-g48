import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.options("*", cors());

app.get("/", (req, res) => {
    res.send("Hello World from communication-service");
});

const httpServer = createServer(app);
httpServer.listen(8081);

const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000'
    }
});

io.on("connection", (socket) => {
    console.log("listening on: 8081")
    socket.on("sendMessage", async function (data) {
        if (
            !(data.hasOwnProperty("input") && data.hasOwnProperty("roomId"))
        ) {
            throw "data sent does not have required information!";
        }
        console.log("This is the input: " + data.input);
        console.log("This is the roomId: " + data.roomId);
    })
});