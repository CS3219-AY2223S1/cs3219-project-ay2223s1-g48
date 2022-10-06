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
        origin: 'http://localhost:8081'
    }
});