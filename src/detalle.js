
//datos de las tarjetas para el html
const datosCuriosos = {
  1: {
    titulo: "El PEPINILLO 🥒",
    texto: "Rick se transformó en un pepinillo únicamente para evitar asistir a una sesión de terapia familiar. Lo más absurdo es que, aun siendo un simple pepinillo, logró construir un exoesqueleto y sobrevivir a situaciones extremas"
  },
  2: {
    titulo: "EL MAS ROMANTICO 💘",
    texto: "Los intentos de Morty por impresionar a las chicas suelen acabar mal. En varias ocasiones provocó accidentes, invasiones o incluso alteró realidades enteras por tomar malas decisiones"
  },
  3: {
    titulo: "LA COMIDA AL REVES 🍕",
    texto: "Durante un viaje por el multiverso aparece una realidad donde todo funciona al revés: las pizzas son seres inteligentes y los humanos son la comida que piden por teléfono"
  },
  4: {
    titulo: "EL PERRO MAS INTELIGENTE 🐶",
    texto: "Snuffles, el perro de la familia, obtuvo inteligencia avanzada gracias a un invento de Rick. En poco tiempo organizó una rebelión de perros y estuvo a punto de dominar el planeta."
  },
  5: {
    titulo: "CRISIS EXISTENCIAL BUTTER 🧈",
    texto: "Butter Bot fue creado para una sola tarea: pasar la manteca. Cuando preguntó cuál era su propósito y recibió la respuesta, sufrió una crisis existencial instantánea que lo convirtió en uno de los personajes más recordados."
  }
};

function obtenerParametroURL(nombre) {
  const url = new URL(window.location.href);
  return url.searchParams.get(nombre);
}
function mostrarDetalle() {
  const idDato = obtenerParametroURL("dato");
  const contenedor = document.getElementById("contenidoDetalle");

  const dato = datosCuriosos[idDato];

  if (!dato) {
    contenedor.innerHTML = `<p>No se encontró el dato que buscás.</p>`;
    return;
  }
  contenedor.innerHTML = `
    <h1>${dato.titulo}</h1>
    <p>${dato.texto}</p>
    <a href="comparar.html" class="boton-comparar-detalle">Ir al comparador →</a>
  `;
}
mostrarDetalle();
