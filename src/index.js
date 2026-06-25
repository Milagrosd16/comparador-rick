
//datos de la api al footer

async function obtenerEstadisticas() {
  try {
    const resPersonajes = await fetch("https://rickandmortyapi.com/api/character");
    if (!resPersonajes.ok) throw new Error("Error al traer personajes");
    const dataPersonajes = await resPersonajes.json();

    const resUbicaciones = await fetch("https://rickandmortyapi.com/api/location");
    if (!resUbicaciones.ok) throw new Error("Error al traer ubicaciones");
    const dataUbicaciones = await resUbicaciones.json();

    const resEpisodios = await fetch("https://rickandmortyapi.com/api/episode");
    if (!resEpisodios.ok) throw new Error("Error al traer episodios");
    const dataEpisodios = await resEpisodios.json();

    document.getElementById("cantPersonajes").textContent = dataPersonajes.info.count;
    document.getElementById("cantUbicaciones").textContent = dataUbicaciones.info.count;
    document.getElementById("cantEpisodios").textContent = dataEpisodios.info.count;

  

    
    document.getElementById("cantPersonajesFooter").textContent = dataPersonajes.info.count;
    document.getElementById("cantUbicacionesFooter").textContent = dataUbicaciones.info.count;
    document.getElementById("cantEpisodiosFooter").textContent = dataEpisodios.info.count;

  

    document.getElementById("puntajeImdb").textContent = "9.1";

  } catch (error) {
    console.error(error);
    //si hay error quedan los fijos del html
  }
}

obtenerEstadisticas();
