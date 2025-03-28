const socket = io("http://localhost:5051", { path: "/rea-time" });

let rolPlayer = ""
let namePlayer = ""
let idPlayer = ""

const inputName = document.getElementById("name")
const registerDiv = document.getElementById("register")

// Registrar player
  
  const registerPlayerUrl = "http://localhost:5051/join-game/";

  async function registrarPlayer() {
    try {
      if (!inputName.value) {
        alert("El nombre de usuario es requerido");
        return;
      }
      const registerRequest = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name: inputName.value}),
      };
  
      const response = await fetch(registerPlayerUrl, registerRequest);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en la solicitud");
      }
      
      const data = await response.json();
      alert(data.message);

      idPlayer = data.player.id;
      namePlayer = data.player.name;
      rolPlayer = data.player.rol;

      inputName.value = "";

      if (response === "Ya hay 4 jugadores") {
        alert(data.message)
      }

      if (rolPlayer === "lobo") {
        document.getElementById("register").style.display = "none";
        document.getElementById("screen-player").innerHTML = `
          <h2>${namePlayer}</h2>
          <p>Tu rol es:</p>
          <p>${rolPlayer}</p>
          <p id="text">Esperando a que el narrador empiece el juego</p>
        `
      } else  {
        document.getElementById("register").style.display = "none";
        document.getElementById("screen-player").innerHTML = `
          <h2>${namePlayer}</h2>
          <p>Tu rol es:</p>
          <p>${rolPlayer}</p>
            <p id="text">Esperando a que el narrador empiece el juego</p>
        `
      }
  
    } catch (error) {
       console.error("Error:", error);
    }
  }

// Btn join game registrar usuario
document.getElementById("join").addEventListener("click", registrarPlayer);


socket.on("notificar-dia", (data) => {
    document.getElementById('player_app').style.backgroundColor = 'white';
    document.getElementById('player_app').style.color = 'black';
    if (rolPlayer === "lobo") {
        document.getElementById("register").style.display = "none";
        document.getElementById("screen-player").innerHTML = `
          <h2>${namePlayer}</h2>
          <p>Tu rol es:</p>
          <p>${rolPlayer}</p>
            <p>Narrador dijo:</p>
          <p>${data.message}</p>
          <p id="text">Esperando a que los aldeanos maten a alguien</p>
        `
      } else  {
        document.getElementById("register").style.display = "none";
        document.getElementById("screen-player").innerHTML = `
          <h2>${namePlayer}</h2>
          <p>Tu rol es:</p>
          <p>${rolPlayer}</p>
            <p>Narrador dijo:</p>
          <p>${data.message}</p>
            <p id="text">Ponte de acuerdo con todos los jugadores para matar a uno de los siguientes jugadores</p>
            <div id="jugadores"></div>
        `
        const jugadoresDiv = document.getElementById("jugadores");
        data.players.forEach((player, index) => {
        const btn = document.createElement("button");
        btn.id = `player-${player.id}`;
        btn.className = "jugador-selected";
        btn.innerText = `${player.name}, Jugador ${index + 1}`;
        btn.style.display = "block";
        btn.addEventListener("click", () => {
            // Lógica a ejecutar cuando se haga clic en el botón
            console.log(`Jugador seleccionado: ${player.name}`);
        });
        jugadoresDiv.appendChild(btn);
        });
      }
});

socket.on("notificar-noche", (data) => {
    document.getElementById('player_app').style.backgroundColor = 'black';
    document.getElementById('player_app').style.color = 'white';
    if (rolPlayer === "lobo") {
        document.getElementById("register").style.display = "none";
        document.getElementById("screen-player").innerHTML = `
          <h2>${namePlayer}</h2>
          <p>Tu rol es:</p>
          <p>${rolPlayer}</p>
            <p>Narrador dijo:</p>
          <p>${data.message}</p>
          <p id="text">Esperando a que los aldeanos maten a alguien</p>
        `
      } else  {
        document.getElementById("register").style.display = "none";
        document.getElementById("screen-player").innerHTML = `
          <h2>${namePlayer}</h2>
          <p>Tu rol es:</p>
          <p>${rolPlayer}</p>
            <p>Narrador dijo:</p>
          <p>${data.message}</p>
            <p id="text">Ponte de acuerdo con todos los jugadores para matar a uno de los siguientes jugadores</p>
            <div id="jugadores"></div>
        `
        const jugadoresDiv = document.getElementById("jugadores");
        data.players.forEach((player, index) => {
        const btn = document.createElement("button");
        btn.id = `player-${player.id}`;
        btn.className = "jugador-selected";
        btn.innerText = `${player.name}, Jugador ${index + 1}`;
        btn.style.display = "block";
        btn.addEventListener("click", () => {
            // Lógica a ejecutar cuando se haga clic en el botón
            console.log(`Jugador seleccionado: ${player.name}`);
        });
        jugadoresDiv.appendChild(btn);
        });
      }
});