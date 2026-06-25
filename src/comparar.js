let todosLosPersonajes = [];
let especieActiva = "Todos";
let personaje1 = null;
let personaje2 = null;
 
const grilla = document.getElementById("grillaPersonajes");
const buscador = document.getElementById("buscador");
const selectOrden = document.getElementById("orden");
const mensaje = document.getElementById("mensaje");
const btnComparar = document.getElementById("btnComparar");
const nombre1Span = document.getElementById("nombre1");
const nombre2Span = document.getElementById("nombre2");
const resultadoDiv = document.getElementById("resultadoComparacion");
 

//traigo los personajes de la api(fetch + async/await)
async function obtenerPersonajes() {
  mensaje.textContent = "Cargando personajes...";
  try {
    let personajesAcumulados = [];
 
    for (let pagina = 1; pagina <= 4; pagina++) {
      const response = await fetch(`https://rickandmortyapi.com/api/character?page=${pagina}`);
      if (!response.ok) throw new Error("Error en la respuesta de la API");
      const data = await response.json();
      personajesAcumulados = personajesAcumulados.concat(data.results);
    }
 
    todosLosPersonajes = personajesAcumulados;
    mensaje.textContent = "";
    mostrarPersonajes(todosLosPersonajes);
 
  } catch (error) {
    console.error(error);
    mensaje.textContent = "Ocurrió un error al cargar los personajes. Probá recargar la página.";
  }
}
 

//muestro los personajes 

function mostrarPersonajes(listaPersonajes) {
  if (listaPersonajes.length === 0) {
    grilla.innerHTML = "";
    mensaje.textContent = "No se encontraron personajes con esos criterios.";
    return;
  }
 
  mensaje.textContent = "";
 
  const tarjetasHTML = listaPersonajes.map((personaje) => {
    const estaSeleccionado =
      (personaje1 && personaje1.id === personaje.id) ||
      (personaje2 && personaje2.id === personaje.id);
 
   
    return `
      <div id="personaje-${personaje.id}" class="tarjeta-personaje ${estaSeleccionado ? "seleccionado" : ""}">
        <img src="${personaje.image}" alt="${personaje.name}">
        <h4>${personaje.name}</h4>
        <p>${personaje.species} · ${personaje.status}</p>
      </div>
    `;
  }).join("");
 
  grilla.innerHTML = tarjetasHTML;
  conectarClicksDeTarjetas();
}
 

//conecnto el click
function conectarClicksDeTarjetas() {
  const tarjetas = document.querySelectorAll(".tarjeta-personaje");
 
  tarjetas.forEach((tarjeta) => {
    tarjeta.addEventListener("click", () => {
      // el id real de la tarjeta es algo como "personaje-5"
      // le sacamos el prefijo "personaje-" para quedarnos solo con el numero
      const idCompleto = tarjeta.getAttribute("id");
      const idClickeado = Number(idCompleto.replace("personaje-", ""));
 
      const personajeClickeado = todosLosPersonajes.find((p) => p.id === idClickeado);
      seleccionarPersonaje(personajeClickeado);
    });
  });
}
 

//seleccionar personajes
function seleccionarPersonaje(personaje) {
  if (personaje1 && personaje1.id === personaje.id) {
    personaje1 = null;
  } else if (personaje2 && personaje2.id === personaje.id) {
    personaje2 = null;
  } else if (!personaje1) {
    personaje1 = personaje;
  } else if (!personaje2) {
    personaje2 = personaje;
  } else {
    personaje1 = personaje;
  }
 
  actualizarIndicadorSeleccion();
  mostrarPersonajes(obtenerListaFiltrada());
}
 

function actualizarIndicadorSeleccion() {
  nombre1Span.textContent = personaje1 ? personaje1.name : "Elegí un personaje";
  nombre2Span.textContent = personaje2 ? personaje2.name : "Elegí un personaje";
  btnComparar.disabled = !(personaje1 && personaje2);
}
 
//filtra por especie


function obtenerListaFiltrada() {
  let lista = todosLosPersonajes;
 if (especieActiva !== "Todos") {lista = lista.filter((personaje) => personaje.species === especieActiva);
  }
 
  const textoBuscado = buscador.value.toLowerCase();
  if (textoBuscado !== "") {lista = lista.filter((personaje) =>
      personaje.name.toLowerCase().includes(textoBuscado)
    );
  }
 
  const ordenElegido = selectOrden.value;
  if (ordenElegido === "nombre-asc") {
  lista.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
  } else if (ordenElegido === "nombre-desc") {
    lista.sort((a, b) => {
      if (a.name > b.name) return -1;
      if (a.name < b.name) return 1;
      return 0;
    });
  } else if (ordenElegido === "id-asc") {
    lista.sort((a, b) => a.id - b.id);
  }
 
  return lista;
}
 

//orden de buscar
buscador.addEventListener("input", () => {
  mostrarPersonajes(obtenerListaFiltrada());
});
selectOrden.addEventListener("change", () => {
  mostrarPersonajes(obtenerListaFiltrada());
});
 
//botones de filtro segun la especie

const botonesEspecie = document.querySelectorAll(".btn-especie");
 
botonesEspecie.forEach((boton) => {
  boton.addEventListener("click", () => {
 
    especieActiva = boton.textContent;
 
    botonesEspecie.forEach((b) => {
      b.style.boxShadow = "none";
    });
    boton.style.boxShadow = "0 0 0 3px #ffffff";
 
    mostrarPersonajes(obtenerListaFiltrada());
  });
});
 

//boton comparar
btnComparar.addEventListener("click", () => {
  if (!personaje1 || !personaje2) return;
 
  const mismaEspecie = personaje1.species === personaje2.species;
  const mismoEstado = personaje1.status === personaje2.status;
  const mismoGenero = personaje1.gender === personaje2.gender;
 
  resultadoDiv.innerHTML = `
    <h2>${personaje1.name} vs ${personaje2.name}</h2>
    <ul>
      <li>
        ${mismaEspecie
          ? `Ambos son de la misma especie: ${personaje1.species}.`
          : `${personaje1.name} es ${personaje1.species}, mientras que ${personaje2.name} es ${personaje2.species}.`}
      </li>
      <li>
        ${mismoEstado
          ? `Ambos comparten el mismo estado: ${personaje1.status}.`
          : `${personaje1.name} está ${personaje1.status}, mientras que ${personaje2.name} está ${personaje2.status}.`}
      </li>
      <li>
        ${mismoGenero
          ? `Ambos tienen el mismo género: ${personaje1.gender}.`
          : `${personaje1.name} es de género ${personaje1.gender}, y ${personaje2.name} es de género ${personaje2.gender}.`}
      </li>
      <li>
        ${personaje1.name} es originario de ${personaje1.origin.name}, y ${personaje2.name} es originario de ${personaje2.origin.name}.
      </li>
    </ul>
  `;
 
  resultadoDiv.scrollIntoView({ behavior: "smooth" });
});
 
obtenerPersonajes();