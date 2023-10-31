"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
require("dotenv").config();
const URL = process.env.NODE_ENV === "development"
    ? process.env.CLIENT_URL_DEV
    : process.env.CLIENT_URL_PROD;
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
app.use((0, cors_1.default)({ origin: URL }));
const io = new socket_io_1.Server(httpServer, { cors: { origin: URL } });
io.on("connection", (socket) => {
    socket.on("beginPath", (args) => {
        socket.broadcast.emit("beginPath", args);
    });
    socket.on('lineDraw', (args) => {
        socket.broadcast.emit('lineDraw', args);
    });
    socket.on('changeConfig', (args) => {
        socket.broadcast.emit('changeConfig', args);
    });
});
app.get('/', (req, res) => {
    res.json({ message: "Hello World" });
});
app.get('/health', (req, res) => {
    res.status(200).json({ message: "Everything is working fine here 🚀🎉" });
});
httpServer.listen(5000);
console.log("Server running on port 5000");
