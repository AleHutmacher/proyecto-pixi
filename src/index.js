const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
const PORT = 3001;
const API_URL = "http://backend-pixi.vercel.app/all-puntuaciones"; // URL de la API externa

// Habilitar CORS para todas las solicitudes
app.use(cors());

app.get("/puntuaciones", async (req, res) => {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // Si la respuesta de la API externa no es exitosa, lanza un error
      throw new Error(
        `Error al obtener datos de la API externa: ${response.status}`
      );
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error en el servidor intermedio:", error); // Muestra detalles del error
    res
      .status(500)
      .json({
        error: "Error al obtener las puntuaciones desde la API externa",
      });
  }
});

app.listen(PORT, () =>
  console.log(`Servidor intermedio corriendo en http://localhost:${PORT}`)
);
