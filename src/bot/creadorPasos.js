import { Paso, PasoOciones, PasoQuery } from "./paso.js";
import { Productos, Celulares, Usuarios } from "../datos/index.js";

export class CreadorPasos {
  constructor() {
    /**
     * @type {Map<string, Paso>}
     */
    this.pasos = new Map();
    this.definirPasos();
  }

  definirPasos() {
    const pInicio = new PasoOciones(
      "0",
      "inicio",
      "¡Bienvenido al Chatbot de MariangelCell! 😊📱\n¡Hola! Soy tu asistente virtual Mari, estoy aquí para ayudarte con todas tus consultas y necesidades relacionadas con nuestros productos y servicios tecnológicos. 🤖\nNo dudes en preguntarme sobre nuestros últimos modelos de celulares 📲, audífonos 🎧, cámaras fotográficas 📷 y periféricos 🖱️. También puedo ayudarte a conocer nuestro inventario actualizado, registrar tus compras en tienda física 🛒, brindarte información sobre nuestros servicios técnicos 🛠️, y mucho más.\nEstoy aquí para hacer tu experiencia con MariangelCell más fácil y conveniente. ¡Así que adelante! 👍\n\nSelecciona una de las opciones : \n\n"
    );

    const pUbicacion = new Paso("1", "Ubicación", "Aún no implementado");

    const pConsultarProductos = new PasoOciones(
      "2",
      "Consultar productos",
      "Elija el tipo de producto"
    );

    const pConsultarOtros = new Paso(
      "3",
      "Consultar otros productos",
      "Aún no implementado"
    );

    const pConsultarCelulares = new PasoOciones("4", "Consultar celulares", "");

    const pConsultarCelularesTodos = new PasoQuery(
      "5",
      "Todos los celulares",
      "Estos son todos los celulares que tenemos disponibles:",
      async () => {
        const celulares = await new Celulares().obtenerTodos();
        return celulares.map((cel) => {
          return `marca: ${cel.marca}\nprecio: ${cel.precio}$\nprocesador: ${cel.procesador}`;
        }, "");
      }
    );

    const pConsultarCelularesFiltro = new PasoOciones(
      "6",
      "Filtrar",
      "!Perfecto! ¿Qué tipo de celular estás buscando?"
    );

    const pConsultarCelularesFiltroNuevos = new PasoQuery(
      "7",
      "Nuevo",
      "Estos son todos loa celulares nuevos que tenemos disponibles:",
      async () => {
        const celulares = await new Celulares().obtenerPorTipo("n");
        return celulares.map((cel) => {
          return `marca: ${cel.marca}\nprecio: ${cel.precio}$\nprocesador: ${cel.procesador}`;
        }, "");
      }
    );

    const pConsultarCelularesFiltroExhibicion = new PasoQuery(
      "8",
      "Exhibición",
      "Estos son todos loa celulares nuevos que tenemos disponibles:",
      async () => {
        const celulares = await new Celulares().obtenerPorTipo("e");
        return celulares.map((cel) => {
          return `marca: ${cel.marca}\nprecio: ${cel.precio}$\nprocesador: ${cel.procesador}`;
        }, "");
      }
    );

    // se creana las relaciones entre los pasos
    pInicio.agregarOpcion(pUbicacion, pConsultarProductos);

    pConsultarProductos.agregarOpcion(pConsultarOtros, pConsultarCelulares);

    pConsultarCelulares.agregarOpcion(
      pConsultarCelularesTodos,
      pConsultarCelularesFiltro
    );

    pConsultarCelularesFiltro.agregarOpcion(
      pConsultarCelularesFiltroNuevos,
      pConsultarCelularesFiltroExhibicion
    );

    // se agregan los pasos al mapa de pasos
    this.agregarPaso(
      pInicio,
      pUbicacion,
      pConsultarProductos,
      pConsultarOtros,
      pConsultarCelulares,
      pConsultarCelularesTodos,
      pConsultarCelularesFiltro,
      pConsultarCelularesFiltroNuevos,
      pConsultarCelularesFiltroExhibicion
    );
  }

  agregarPaso(...paso) {
    for (const p of paso) {
      this.pasos.set(p.id, p);
    }
  }
}
