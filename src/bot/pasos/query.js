export default class Query {
  constructor() {
    /**
     * @type {Map<string, string>}
     */
    this.valores = new Map();
  }

  /**
   *
   * @param {string} key
   * @param {string} value
   */
  set(key, value) {
    this.valores.set(key, value);
  }

  limpiar() {
    this.valores.clear();
  }

  /**
   * @returns {Array<object>}
   */
  ejecutar() {
    throw new Error("Not implemented");
  }
}
