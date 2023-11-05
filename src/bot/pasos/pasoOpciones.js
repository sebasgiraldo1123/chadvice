import Paso from "./paso.js";

export default class PasoOpciones extends Paso {
  constructor(id, valor, mensaje) {
    super(id, valor, mensaje);
    this.opciones = new Map();
  }

  aMensajes() {
    let opcionesStr = "";
    for (const [key, value] of this.opciones) {
      opcionesStr += `${key}. ${value.valor}\n`;
    }

    return [{ text: this.mensaje + "\n" + opcionesStr }];
  }

  agregarOpcion(...pasos) {
    for (const paso of pasos) {
      const numOpcion = this.opciones.size + 1;
      const numOpcionStr = numOpcion.toString();
      this.opciones.set(numOpcionStr, paso);
    }
  }

  siguientePaso(opcion) {
    return this.opciones.get(opcion);
  }
}
