import Paso from "./paso.js";
import Query from "./query.js";

export default class PasoInput extends Paso {
  constructor(id, valor, mensaje, clave, query) {
    super(id, valor, mensaje);
    /**
     * @type {string}
     */
    this.clave = clave;
    /**
     * @type {Query}
     */
    this.query = query;
  }

  /**
   *
   * @param {Paso} opcion
   */
  agregarOpcion(opcion) {
    this.pasoSiguiente = opcion;
  }

  /**
   *
   * @param {string} opcion
   * @returns {Paso}
   */
  siguientePaso(opcion) {
    this._accion(opcion);
    return this.pasoSiguiente;
  }

  _accion(valor) {
    const clave = this.pasoSiguiente?.clave;
    this.query.set(clave, valor);
  }
}
