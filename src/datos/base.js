export default class Ibase {
  constructor() {}

  /**
   *
   * @param {object} data
   */
  agregar(data) {
    throw new Error("No implementado");
  }

  /**
   * @returns {Array[object]}
   */
  obtenerTodos() {
    throw new Error("No implementado");
  }

  /**
   *
   * @param {int} id
   * @returns {object}
   */
  obtenerPorId(id) {
    throw new Error("No implementado");
  }

  /**
   *
   * @param {int} id
   * @param {object} data
   *
   * @returns {boolean}
   */
  modificarPorId(id, data) {
    throw new Error("No implemetado");
  }

  /**
   *
   * @param {int} id
   *
   * @returns {boolean}
   */
  eliminarPorId(id) {
    throw new Error("No implementado");
  }
}
