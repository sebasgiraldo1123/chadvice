import Paso from "./paso.js";
import Query from "./query.js";

export default class PasoFinalQuery extends Paso {
  constructor(id, valor, mensaje, clave, query) {
    super(id, valor, mensaje);
    this.clave = clave;
    this.query = query;
  }

  async aMensajes() {
    const resultado = await this.query.ejecutar();

    return [{ text: this.mensaje }, ...resultado];
  }
}
