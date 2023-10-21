import IBase from "../base.js";
import {Venta} from "../schemas.js";
  
export default class Celulares extends IBase {
    constructor() {
        super();
        console.log("");
    }

    agregar(data) {
        console.log("Agregando equipo");
    }

    obtenerTodos() {
        return Venta.findAll();
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