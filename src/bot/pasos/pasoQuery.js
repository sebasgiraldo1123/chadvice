import PasoOpciones from "./pasoOpciones.js";
import Query from "./query.js";

export default class PasoQuery extends PasoOpciones {
  /**
   *
   * @param {string} id
   * @param {string} valor
   * @param {string} mensaje
   * @param {string} clave
   * @param {Query} query
   */
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
   * @param {string} opcion
   * @returns {Paso}
   */
  siguientePaso(opcion) {
    this._accion(opcion);
    return this.opciones.get(opcion);
  }

  _accion(opcion) {
    const valor = this.opciones.get(opcion)?.valor;
    const clave = this.opciones.get(opcion)?.clave;
    this.query.set(clave, valor);
  }
}
