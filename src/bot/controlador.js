import { Usuarios } from "../datos/index.js";
import Paso from "./pasos/paso.js";
import PasoOpciones from "./pasos/pasoOpciones.js";
import PasoQuery from "./pasos/pasoQuery.js";
import PasoInput from "./pasos/pasoInput.js";
import { pasos } from "./pasos/creadorPasoso.js";

const PASO_BASE = "0";
export default class Controlador {
  constructor() {
    this.usuarios = new Usuarios();
    this.pasos = pasos;
  }

  async mensaje(input, numeroTelefonoUsuario) {
    let usuario = await this.usuarios.obtenerPorTelefono(numeroTelefonoUsuario);
    if (!usuario) usuario = this.usuarios.agregarNuevo(numeroTelefonoUsuario);

    const idPasoActual = usuario.pasoActual;
    const pasoActual = this.pasos.find((paso) => paso.id === idPasoActual);

    if (
      !(pasoActual instanceof PasoOpciones) &&
      !(pasoActual instanceof PasoInput)
    ) {
      usuario.pasoActual = PASO_BASE;
      this.usuarios.modificarPorId(usuario.idUsuario, usuario);
      const pasoSiguiente = this.pasos.find((paso) => paso.id === PASO_BASE);
      return await pasoSiguiente.aMensajes();
    }
    const pasoSiguiente = pasoActual.siguientePaso(input)
      ? pasoActual.siguientePaso(input)
      : pasoActual;
    usuario.pasoActual = pasoSiguiente.id;
    this.usuarios.modificarPorId(usuario.idUsuario, usuario);

    return await pasoSiguiente.aMensajes();
  }
}
