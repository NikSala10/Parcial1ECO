const express = require("express");
const path = require("path");
const { Server } = require("socket.io");
const { createServer } = require("http");

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  path: "/rea-time",
  cors: {
    origin: "*",
  },
});

app.use(express.json());
app.use("/player-app", express.static(path.join(__dirname, "player_app")));
app.use("/narrator-app", express.static(path.join(__dirname, "narrator_app")));

let players = [];
let roles = ["aldeano", "lobo","aldeano", "lobo"]

app.get("/join-game", (req, res) => {
  res.send(players);
});

app.post("/join-game", (req, res) => {
  const {name} = req.body;

  if (players.length === 4) {
    return res.status(400).send({ message: "Ya hay 4 jugadores" });
  }

  const rolAleatorio = Math.floor(Math.random() * roles.length);
  const rolSeleccionado = roles[rolAleatorio];

  // Remueve el rol asignado del array
  roles.splice(rolAleatorio, 1);


  const newPlayer = { id: players.length + 1, name, rol:rolSeleccionado};
  players.push(newPlayer);

  res.status(201).send({ message: "Jugador registrado correctamente", player: newPlayer,});
});

app.post("/notificar-dia", (req, res) => {
  const {message} = req.body;

  if (players.length !== 4) {
    return res.status(400).send({ message: "No hay 4 jugadores" });
  }
  io.emit("notificar-dia", { message: message, players});
  res.status(200).send({ message: "Mensaje enviado" });

});

app.post("/notificar-noche", (req, res) => {
  const {message} = req.body;

  if (players.length !== 4) {
    res.status(201).send({ message: "No hay 4 jugadores"});
  }
  io.emit("notificar-noche", { message: message, players});
  res.status(200).send({ message: "Mensaje enviado" });
  
});

httpServer.listen(5051);
