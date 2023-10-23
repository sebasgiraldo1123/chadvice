import IBase from "../base.js";

import { Celular, Producto } from "../schemas.js";

export default class Celulares extends IBase {
  constructor() {
    super();

  }

  agregar(data) {
    console.log("Agregando equipo");
  }

  async obtenerTodos() {
    const celulares = await Celular.findAll({ include: Producto });
    if (!celulares) return [];
    return celulares.map((celular) => {
      const { Producto, ...datos } = celular.dataValues;
      return { ...datos, ...Producto.dataValues };
    });
  }

  obtenerPorId(id) {
    return Celular.findByPk(id, { include: Producto });
  }

  async obtenerPorTipo(tipo) {
    const celulares = await Celular.findAll({
      where: { tipo },
      include: Producto,
    });
    if (!celulares) return [];
    return celulares.map((celular) => {
      const { Producto, ...datos } = celular.dataValues;
      return { ...datos, ...Producto.dataValues };
    });
  }

  modificarPorId(id, data) {
    console.log("Modificando equipo por id");
  }

  eliminarPorId(id) {
    console.log("Eliminando equipo por id");
  }
}
