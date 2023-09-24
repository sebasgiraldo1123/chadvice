import IBase from "./base.js";

export default class Equipos extends IBase {
  constructor() {
    super();
    console.log("");
  }

  agregar(data) {
    console.log("Agregando equipo");
  }

  obtenerTodos() {
    console.log("Obteniendo todos los equipos");
    return ["alcatel", "motorola 3"];
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
