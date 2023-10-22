import { Productos, Usuarios } from "../datos/index.js";
import { CreadorPasos } from "./creadorPasos.js";

const PASO_BASE = "0";
export default class Bot {
  constructor() {
    this.productos = new Productos();
    this.usuarios = new Usuarios();
    this.pasos = new CreadorPasos().pasos;
  }

  async mensaje(paso, numeroTelefonoUsuario) {
    const usuario = await this._obtenerUsuario(numeroTelefonoUsuario);
    const pasoActual = this.pasos.get(usuario.pasoActual);
    let pasoSiguiente = pasoActual.siguientePaso(paso);

    // acualizar paso del usuario
    if (pasoSiguiente?.opciones) {
      usuario.pasoActual = pasoSiguiente.id;
      this.usuarios.modificarPorId(usuario.idUsuario, usuario);
    }

    // regresar al estado inicial
    if (pasoSiguiente && !pasoSiguiente.opciones) {
      usuario.pasoActual = PASO_BASE;
      this.usuarios.modificarPorId(usuario.idUsuario, usuario);
    }

    if (!pasoSiguiente) pasoSiguiente = pasoActual;

    const respuestas = await pasoSiguiente.toString();

    // TODO: implementar respuesta con imagen
    return respuestas.map((respuesta) => {
      return { text: respuesta };
    });
  }

  async _obtenerUsuario(numeroTelefonoUsuario) {
    let usuario = await this.usuarios.obtenerPorTelefono(numeroTelefonoUsuario);

    if (!usuario) {
      const nuevoUsuario = {
        nombre: "Usiario Luis E",
        cedula: numeroTelefonoUsuario.slice(0, 8),
        correo: `correo${numeroTelefonoUsuario}@example.com`,
        contrasena: "contrasenaSegura" + numeroTelefonoUsuario,
        direccion: "Dirección del Usuario",
        telefono: numeroTelefonoUsuario,
        fechaNacimiento: "1990-01-01",
      };
      usuario = await this.usuarios.agregar(nuevoUsuario);
    }
    return usuario;
  }
}
