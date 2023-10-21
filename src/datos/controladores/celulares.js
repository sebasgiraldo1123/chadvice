import IBase from "../base.js";
import {Celular, Producto} from "../schemas.js";
  
export default class Celulares extends IBase {
    constructor() {
        super();
        console.log("");
    }

    agregar(data) {
        console.log("Agregando equipo");
    }

    obtenerTodos() {
      return Celular.findAll({include: Producto});
    }

    obtenerPorId(id) {
       return Celular.findByPk(id, { include: Producto })
    }

    modificarPorId(id, data) {
        console.log("Modificando equipo por id");
    }

    eliminarPorId(id) {
        console.log("Eliminando equipo por id");
    }
}