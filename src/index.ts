import express, { Express } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { TActiveMenu } from "./utils/constant";
require("dotenv").config();

const URL = "http://52.2.149.85:3000";

const app: Express = express();
const httpServer = createServer(app);
app.use(cors({ origin: URL }));
const io = new Server(httpServer, { cors: { origin: URL } });

io.on("connection", (socket) => {
  socket.on("beginPath", (args: { x: number; y: number }) => {
    socket.broadcast.emit("beginPath", args);
  });
  socket.on('lineDraw', (args: {x: number, y: number}) => {
    socket.broadcast.emit('lineDraw', args);
  })
  socket.on('changeConfig', (args: {color: string, size: number, activeMenu: TActiveMenu}) => {
    socket.broadcast.emit('changeConfig', args);
  })
});

app.get('/', (req, res) => {
  res.json({ message: `Welcome to the server 🚀🎉`});
})
app.get('/health', (req, res) => {
  res.status(200).json({ message: "Everything is working fine here 🚀🎉"});
})

httpServer.listen(5000);
console.log("Server running on port 5000");
