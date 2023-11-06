export default class Paso {
  /**
   *
   * @param {string} id
   * @param {string} valor
   * @param {string} mensaje
   */
  constructor(id, valor, mensaje) {
    this.id = id;
    this.valor = valor;
    this.mensaje = mensaje;
  }

  /**
   *
   * @returns {Array<object>}
   */
  aMensajes() {
    return [{ text: this.mensaje }];
  }
}
