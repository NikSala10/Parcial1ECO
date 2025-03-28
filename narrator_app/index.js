const socket = io("http://localhost:5051", { path: "/rea-time" });

const btnDia = document.getElementById("dia").addEventListener("click", notificarDia);
const btnNoche = document.getElementById("noche").addEventListener("click", notificarNoche);

function notificarDia () {
    fetch ("http://localhost:5051/notificar-dia/" ,{
      method: "POST",
      headers: {  "Content-Type": "application/json"},
      body: JSON.stringify({message: "Dia"
      })
    })
    .then((response) => response.json())
    .then((data) => {
        alert(data.message);
      })
    .catch((error) => console.error("Error:", error));
  }

  function notificarNoche () {
    fetch ("http://localhost:5051/notificar-noche/" ,{
      method: "POST",
      headers: {  "Content-Type": "application/json"},
      body: JSON.stringify({message: "Noche"
      })
    })
    .then((response) => response.json())
    .then((data) => {
        alert(data.message);
      })
    .catch((error) => console.error("Error:", error));
  }



  // Traer usuarios

  const getUsersBtn = document.getElementById("traer-usuarios").addEventListener("click", fetchGetAllUsers);


  async function fetchGetAllUsers() {
    try {
      const response = await fetch("http://localhost:5051/join-game");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    const data = await response.json();
    renderAllUsersData(data);

    } catch (error) {
      console.error("Error al traer datos")
    }
  }

  
const renderAllUsersData = (data) => {
    const containerUsers = document.getElementById("users");
    containerUsers.innerHTML = "";
  
    data.forEach((user) => {
        const cardUser = document.createElement("div");
        cardUser.className = "card-user";
        cardUser.innerHTML = `
        <div class="content">
          <h3>${user?.name}</h3>
          <p>${user?.rol}</p>
        </div>
        `;
        containerUsers.appendChild(cardUser);
    });
  }