/* eslint-disable no-console */
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const options = {
  cors: true,
  origins: ["http://127.0.0.1:5000"],
};
const io = require("socket.io")(server, options);
const router = require("./routes");
const session = require("./middleware/session");
const port = process.env.PORT || 5000;
app.use(express.json());
const rooms = [];
// if behind a proxy, uncomment this
// server.set('trust proxy', 1);
app.use(session);
app.use(router);
server.listen(port, () =>
  // eslint-disable-next-line no-console
  console.log(`server is running on port ${port}`)
);
io.on("connection", (socket) => {
  socket.on("is:roomCreated", (roomId) => {
    socket.emit("room:status", !!rooms[roomId]);
  });
  socket.on("is:gameStarted", (roomId) => {
    socket.emit("game:status", rooms[roomId].gameStarted);
  });
  socket.on("join:Room", (roomId) => {
    socket.join(roomId);
  });

  socket.on("board:create", (roomId) => {
    rooms[roomId] = { gameStarted: false, rotationValues: [], diceImages: {} };
    socket.join(roomId);;
    io.sockets.emit("create:complete", "this is from the server!");
  });
  socket.on("board:delete", (roomId) => {
    delete rooms[roomId];
  });
  socket.on("host:newRoll", (roomId, rotationValues, hostImageArray) => {
    rooms[roomId].rotationValues = rotationValues;
    rooms[roomId].diceImages = hostImageArray;
    socket.to(roomId).emit("user:getRoll", rotationValues, hostImageArray);
  });

  socket.on("host:newDieRoll", (roomId, rotationValue, hostImage, index) => {
    rooms[roomId].rotationValues[index] = rotationValue;
    rooms[roomId].diceImages[index] = hostImage;
        socket.to(roomId).emit("user:getDieRoll", rotationValue, hostImage, index);
  });

  socket.on("get:update", (roomId) => {
    socket.emit(
      "user:init",
      rooms[roomId].rotationValues,
      rooms[roomId].diceImages
    );
     });

  socket.on("game:start", (roomId, rotationValues, hostImageArray) => {
    rooms[roomId].gameStarted = true;
    rooms[roomId].rotationValues = rotationValues;
    rooms[roomId].diceImages = hostImageArray;
    socket.to(roomId).emit("user:getRoll", rotationValues, hostImageArray);
  });
});
module.exports = server;
