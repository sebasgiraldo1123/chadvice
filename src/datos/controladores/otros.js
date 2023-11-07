import IBase from "../base.js";

import { Otro, Producto } from "../schemas.js";

export default class Otros extends IBase {
  constructor() {
    super();
  }

  agregar(data) {
    console.log("Agregando equipo");
  }
  
  async obtenerTodos() {
    const otros = await Otro.findAll({ include: Producto });
    if (!otros) return [];
    return otros.map((otro) => {
      const { Producto, ...datos } = otro.dataValues;
      return { ...datos, ...Producto.dataValues };
    });
  }
  
  obtenerPorId(id) {
    return Otro.findByPk(id, { include: Producto });
  }

  modificarPorId(id, data) {
    console.log("Modificando equipo por id");
  }

  eliminarPorId(id) {
    console.log("Eliminando equipo por id");
  }
}
