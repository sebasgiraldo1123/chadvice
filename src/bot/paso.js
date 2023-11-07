export class Paso {
  constructor(id, descripcion, mensaje) {
    this.id = id;
    this.descripcion = descripcion;
    /**
     * @type {string}
     */
    this.mensaje = mensaje;
  }

  /**
   *
   * @returns {string[]}
   */
  toString() {
    let msg = this.mensaje;
    return [msg];
  }
}

export class PasoOpciones extends Paso {
  constructor(id, descripcion, mensaje) {
    super(id, descripcion, mensaje);
    /**
     * @type {Map<number, Paso>}
     */
    this.opciones = new Map();
  }

  /**
   *
   * @returns {string[]}
   */
  toString() {
    let msg = this.mensaje;
    for (const [key, value] of this.opciones) {
      msg += `\n${key}. ${value.descripcion}`;
    }
    return [msg];
  }

  /**
   *
   * @param {number} opcion
   * @returns {Paso} siguiente paso
   */
  siguientePaso(opcion) {
    return this.opciones.get(opcion);
  }

  /**
   *
   * @param {Paso} paso
   */
  agregarOpcion(...paso) {
    for (const p of paso) {
      this.opciones.set(p.id, p);
    }
  }
}

export class PasoQuery extends Paso {
  constructor(id, descripcion, mensaje, query) {
    super(id, descripcion, mensaje);
    this.query = query;
  }

  async toString() {
    const mensajes = [];
    mensajes.push(this.mensaje);
    const resultadosQuery = await this.query();
    mensajes.push(...resultadosQuery);
    return mensajes;
  }
}
