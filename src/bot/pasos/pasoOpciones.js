import Paso from "./paso.js";

export default class PasoOpciones extends Paso {
  /**
   *
   * @param {string} id
   * @param {string} valor
   * @param {string} mensaje
   */
  constructor(id, valor, mensaje) {
    super(id, valor, mensaje);
    /**
     * @type {Map<string, Paso>}
     */
    this.opciones = new Map();
  }

  /**
   *
   * @returns {Array<object>}
   */
  aMensajes() {
    let opcionesStr = "";
    for (const [key, value] of this.opciones) {
      opcionesStr += `${key}. ${value.valor}\n`;
    }

    return [{ text: this.mensaje + "\n" + opcionesStr }];
  }

  /**
   *
   * @param  {...Paso} pasos
   */
  agregarOpcion(...pasos) {
    for (const paso of pasos) {
      const numOpcion = this.opciones.size + 1;
      const numOpcionStr = numOpcion.toString();
      this.opciones.set(numOpcionStr, paso);
    }
  }

  /**
   *
   * @param {string} opcion
   * @returns {Paso | undefined}
   */
  siguientePaso(opcion) {
    return this.opciones.get(opcion);
  }
}
