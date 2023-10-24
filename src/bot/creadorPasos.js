import { Paso, PasoOpciones, PasoQuery } from "./paso.js";
import { Productos, Celulares, Usuarios, Otros } from "../datos/index.js";

export class CreadorPasos {
  constructor() {
    /**
     * @type {Map<string, Paso>}
     */
    this.pasos = new Map();
    this.definirPasos();
  }

  definirPasos() {
    const pInicio = new PasoOpciones(
      "0",
      "inicio",
      "¡Bienvenido a MariangelCell! 😊📱 Soy Mari, tu asistente virtual 🤖. Estoy aquí para ayudarte con tus consultas sobre productos y servicios tecnológicos. No dudes en preguntar sobre celulares 📲, audífonos 🎧, cámaras 📷, periféricos 🖱 y más.\n\nSelecciona una de las opciones : \n\n"
    );

    const pUbicacion = new Paso("1", "Ubicación", "NIT:10.337.355.154-1 CEL: 3218660343\nCarrera 23 #24-19 Las Rampas local 30\nCarrera 23 #19-34 Palacio Arzobispal"
    );

    const pConsultarProductos = new PasoOpciones(
      "2",
      "Consultar productos",
      "Elija el tipo de producto"
    );

    const pConsultarOtros = new PasoQuery(
      "3",
      "Consultar otros productos",
      "Estos son otros productos que podrían interesarte:",
      async () => {
        const otros = await new Otros().obtenerTodos();
        return otros.map((otro) => {
          return `Nombre: ${otro.nombre}\nDescripción: ${otro.descripcion}\nPrecio: ${otro.precio}\nColor: ${otro.color}`;
        }, "");
      }
    );

    const pConsultarCelulares = new PasoOpciones("4", "Consultar celulares", "");

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

    const pConsultarCelularesFiltro = new PasoOpciones(
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
      "Estos son todos los celulares nuevos que tenemos disponibles:",
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
