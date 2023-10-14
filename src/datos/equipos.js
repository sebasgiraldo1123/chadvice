import IBase from "./base.js";
import {Producto,Celulares,Otros} from "./schemas.js";

export default class Equipos extends IBase {
  constructor() {
    super();
    console.log("");
  }

  agregar(data) {
    console.log("Agregando equipo");
  }

  obtenerTodos() {
    return Producto.findAll();
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
