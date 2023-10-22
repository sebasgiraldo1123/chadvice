import IBase from "./base.js";
import { Celular } from "./schemas.js";

export default class Celular extends IBase {
  constructor() {
    super();
  }

  agregar(data) {
    console.log("Agregando equipo");
  }

  obtenerTodos() {
    return "[2, 2]";
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
