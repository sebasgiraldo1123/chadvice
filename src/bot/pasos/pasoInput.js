import Paso from "./paso.js";

export default class PasoInput extends Paso {
  constructor(id, valor, mensaje, query) {
    super(id, valor, mensaje);
    this.query = query;
  }

  agregarOpcion(opcion) {
    this.pasoSiguiente = opcion;
  }

  siguientePaso(opcion) {
    this._accion(opcion);
    return this.pasoSiguiente;
  }

  _accion(valor) {
    const clave = this.pasoSiguiente?.clave;
    this.query.set(clave, valor);
  }
}
