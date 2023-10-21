import IBase from "../base.js";
import {Producto} from "../schemas.js";

export default class Productos extends IBase {
  constructor() {
    super();
    console.log("");
  }

  agregar(data) {
    console.log("Agregando equipo");
  }

  async obtenerTodos() {
    var productos = await Producto.findAll();
    return productos.map(({dataValues}) => dataValues);
  }

  obtenerPorId(id) {
    console.log("Obteniendo equipo por id");
  }

  modificarPorId(id, data) {
    console.log("Modificando equipo por id");
  }

  eliminarPorId(id) {
    console.log("Eliminando equipo por id");
  }
}