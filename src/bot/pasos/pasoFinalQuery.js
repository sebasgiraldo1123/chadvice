import Paso from "./paso.js";
import Query from "./query.js";

export default class PasoFinalQuery extends Paso {
  /**
   *
   * @param {string} id
   * @param {string}} valor
   * @param {string}} mensaje
   * @param {string}} clave
   * @param {Query}} query
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
   * @returns {Array<object>}
   */
  async aMensajes() {
    const resultado = await this.query.ejecutar();
    this.query.limpiar();
    return [{ text: this.mensaje }, ...resultado];
  }
}
