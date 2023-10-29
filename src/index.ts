import express, { Express } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from 'cors'

const URL = process.env.NODE_ENV !== 'PRODUCTION' ? process.env.CLIENT_URL : process.env.CLIENT_URL_PROD;

const app: Express = express();
const httpServer = createServer(app);
app.use(cors({origin: URL}))
const io = new Server(httpServer, { cors: { origin: URL } });

io.on("connection", (socket) => {
  console.log("a user connected");
});

httpServer.listen(5000);
console.log('Server running on port 5000');
