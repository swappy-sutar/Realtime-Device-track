import express from "express";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

const server = http.createServer(app);

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("send-location", (data) => {
    const { latitude, longitude, name } = data;
    io.emit("receive-location", { id: socket.id, latitude, longitude, name });
  });

  socket.on("disconnect", () => {
    io.emit("user-disconnect", socket.id);
  });
});

export { app, server };
