import Paso from "./paso.js";
import PasoOpciones from "./pasoOpciones.js";
import PasoQuery from "./pasoQuery.js";
import PasoInput from "./pasoInput.js";
import Query from "./query.js";
import RegistroCelular from "./registroCelular.js";
import PasoFinalQuery from "./pasoFinalQuery.js";
import FiltroCelular from "./filtroCelular.js";

const pInicio = new PasoOpciones(
  "0",
  "inicio",
  "¡Bienvenido al Chatbot de MariangelCell! 😊📱\n¡Hola! Soy tu asistente virtual Mari, estoy aquí para ayudarte con todas tus consultas y necesidades relacionadas con nuestros productos y servicios tecnológicos. 🤖\nNo dudes en preguntarme sobre nuestros últimos modelos de celulares 📲, audífonos 🎧, cámaras fotográficas 📷 y periféricos 🖱️. También puedo ayudarte a conocer nuestro inventario actualizado, registrar tus compras en tienda física 🛒, brindarte información sobre nuestros servicios técnicos 🛠️, y mucho más.\nEstoy aquí para hacer tu experiencia con MariangelCell más fácil y conveniente. ¡Así que adelante! 👍\n\nSelecciona una de las opciones : \n\n"
);

const pUbicacion = new Paso("1", "Ubicación", "Aún no implementado");
const queryRegistroProductos = new RegistroCelular();
const pRegistroCelular = new PasoInput(
  "12",
  "Registro de productos",
  "Ingrese el nombre del producto",
  queryRegistroProductos
);
const pRegistroCelularFin = new PasoFinalQuery(
  "13",
  "_",
  "Faltatan datos!",
  "nombre",
  queryRegistroProductos
);
pRegistroCelular.agregarOpcion(pRegistroCelularFin);
const pConsultarProductos = new PasoOpciones(
  "2",
  "Consultar productos",
  "Elija el tipo de producto"
);

const pConsultarOtros = new Paso(
  "3",
  "Consultar otros productos",
  "Aún no implementado"
);

const pConsultarCelulares = new PasoOpciones("4", "Consultar celulares", "");
const filtroCelular = new FiltroCelular();
const pConsultarCelularesTodos = new PasoFinalQuery(
  "5",
  "Todos los celulares",
  "Estos son todos los celulares que tenemos disponibles:",
  "_",
  filtroCelular
);

const pConsultarCelularesFiltro = new PasoQuery(
  "6",
  "Filtrar",
  "!Perfecto! ¿Qué tipo de celular estás buscando?",
  "_",
  filtroCelular
);

const pConsultarCelularesFiltroNuevos = new PasoQuery(
  "7",
  "Nuevo",
  "!Listo!, Por favor elija la capacidad de memoria",
  "tipo",
  filtroCelular
);

const pConsultarCelularesFiltroExhibicion = new PasoQuery(
  "8",
  "Exhibición",
  "!Listo!, Por favor elija la capacidad de memoria",
  "tipo",
  filtroCelular
);

const pConsultarCelularesFiltroMemoria32 = new PasoFinalQuery(
  "9",
  "2",
  "Estos son los celulares que coinciden con tu búsqueda:",
  "memRam",
  filtroCelular
);

const pConsultarCelularesFiltroMemoria64 = new PasoFinalQuery(
  "10",
  "4",
  "Estos son los celulares que coinciden",
  "memRam",
  filtroCelular
);
const pConsultarCelularesFiltroMemoria128 = new PasoFinalQuery(
  "11",
  "6",
  "Estos son los celulares que coinciden",
  "memRam",
  filtroCelular
);

pInicio.agregarOpcion(pUbicacion, pConsultarProductos, pRegistroCelular);
pConsultarProductos.agregarOpcion(pConsultarCelulares, pConsultarOtros);
pConsultarCelulares.agregarOpcion(
  pConsultarCelularesTodos,
  pConsultarCelularesFiltro
);
pConsultarCelularesFiltro.agregarOpcion(
  pConsultarCelularesFiltroNuevos,
  pConsultarCelularesFiltroExhibicion
);

pConsultarCelularesFiltroNuevos.agregarOpcion(
  pConsultarCelularesFiltroMemoria32,
  pConsultarCelularesFiltroMemoria64,
  pConsultarCelularesFiltroMemoria128
);

pConsultarCelularesFiltroExhibicion.agregarOpcion(
  pConsultarCelularesFiltroMemoria32,
  pConsultarCelularesFiltroMemoria64,
  pConsultarCelularesFiltroMemoria128
);

export const pasos = [
  pInicio,
  pUbicacion,
  pConsultarProductos,
  pConsultarOtros,
  pConsultarCelulares,
  pConsultarCelularesTodos,
  pConsultarCelularesFiltro,
  pConsultarCelularesFiltroNuevos,
  pConsultarCelularesFiltroExhibicion,
  pConsultarCelularesFiltroMemoria32,
  pConsultarCelularesFiltroMemoria64,
  pConsultarCelularesFiltroMemoria128,
  pRegistroCelular,
  pRegistroCelularFin,
];
