import PasoInput from "./pasoInput.js";
import Query from "./query.js";

export default class PasoInputLista extends PasoInput {
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
    let list = this.query.valores.get(clave);
    if (!list) {
      list = [];
    }
    list.push(valor);
    this.query.valores.set(clave, list);
  }
}
