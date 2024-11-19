const backendUrl = "http://localhost:3001/puntuaciones"; // URL del servidor intermedio

async function obtenerPuntuaciones() {
  try {
    const response = await fetch(backendUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error al conectar con el backend: ${response.status}`);
    }

    const datos = await response.json();
    console.log(datos); // Verifica que los datos se reciban correctamente
    mostrarPuntuacionesEnHTML(datos);
  } catch (error) {
    console.error("Error al obtener las puntuaciones:", error);
  }
}

function mostrarPuntuacionesEnHTML(puntuaciones) {
  const tabla = document
    .getElementById("tabla-puntuaciones")
    .querySelector("tbody");
  tabla.innerHTML = ""; // Limpia la tabla para evitar duplicados

  puntuaciones.forEach((puntuacion) => {
    const fila = document.createElement("tr"); // Crea una fila de tabla

    // Columna de nombre
    const columnaNombre = document.createElement("td");
    columnaNombre.textContent = puntuacion.nombre;

    // Columna de puntuación
    const columnaPuntuacion = document.createElement("td");
    columnaPuntuacion.textContent = puntuacion.puntuacion;

    // Añadir columnas a la fila
    fila.appendChild(columnaNombre);
    fila.appendChild(columnaPuntuacion);

    // Añadir fila a la tabla
    tabla.appendChild(fila);
  });
}

// Llama a la función al cargar la página
document.addEventListener("DOMContentLoaded", obtenerPuntuaciones);
