import { Usuarios } from "../datos/index.js";
import Paso from "./pasos/paso.js";
import PasoOpciones from "./pasos/pasoOpciones.js";
import PasoQuery from "./pasos/pasoQuery.js";
import PasoInput from "./pasos/pasoInput.js";
import {creadorPasos} from "./pasos/creadorPasos.js";
import PasoInputLista from "./pasos/pasoInputLista.js";

const PASO_BASE = "0";
export default class Controlador {
  constructor() {
    this.usuarios = new Usuarios();
    this.pasos = null;
  }

  async mensaje(input, numeroTelefonoUsuario) {

    let usuario = await this.usuarios.obtenerPorTelefono(numeroTelefonoUsuario);
    console.log(usuario);
    if (!usuario) usuario = this.usuarios.agregarNuevo(numeroTelefonoUsuario);

    this.pasos = await creadorPasos(usuario);

    const idPasoActual = usuario.pasoActual;
    const pasoActual = this.pasos.find((paso) => paso.id === idPasoActual);

    if (
      !(pasoActual instanceof PasoOpciones) &&
      !(pasoActual instanceof PasoInput) &&
      !(pasoActual instanceof PasoInputLista)
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
