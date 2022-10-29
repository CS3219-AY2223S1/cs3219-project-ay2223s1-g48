import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.options('*', cors());

app.get('/', (req, res) => {
  res.send('Hello World from communication-service');
});

const httpServer = createServer(app);
httpServer.listen(8081);

const io = new Server(httpServer, {
  cors: {
    origin: 'https://cs3219-48-peerprep.herokuapp.com',
  },
});

io.on('connection', (socket) => {
  socket.username = 'Communication Service Server Socket';
  console.log('listening on: 8081');
  socket.emit('setUsername', {});
  socket.on('joinRoom', async function (data) {
    socket.join(data.roomId);
  });
  socket.on('sendMessage', async function (data) {
    if (
      !(
        data.hasOwnProperty('username') &&
        data.hasOwnProperty('input') &&
        data.hasOwnProperty('roomId') &&
        data.hasOwnProperty('counter')
      )
    ) {
      throw 'data sent does not have required information!';
    }
    console.log('This is the username: ' + data.username);
    console.log('This is the input: ' + data.input);
    console.log('This is the roomId: ' + data.roomId);
    io.to(data.roomId).emit('receiveMessage', {
      username: data.username,
      input: data.input,
      roomId: data.roomId,
      counter: data.counter,
    });
  });
  socket.on('disconnecting', (reason) => {
    for (const room of socket.rooms) {
      if (room !== socket.id) {
        socket.to(room).emit('userDisconnect', { username: socket.username });
      }
    }
  });
});
