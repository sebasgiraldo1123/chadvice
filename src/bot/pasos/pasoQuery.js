import PasoOpciones from "./pasoOpciones.js";
import Query from "./query.js";

export default class PasoQuery extends PasoOpciones {
  constructor(id, valor, mensaje, clave, query) {
    super(id, valor, mensaje);
    this.clave = clave;
    this.query = query;
  }

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
