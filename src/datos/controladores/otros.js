import IBase from "../base.js";
import {Otro, Producto} from "../schemas.js";

export default class Otros extends IBase {
    constructor() {
      super();
      console.log("");
    }
  
    agregar(data) {
      console.log("Agregando equipo");
    }
  
    obtenerTodos() {
        return Otro.findAll({include: Producto});
    }
  
    obtenerPorId(id) {
        return Otro.findByPk(id, { include: Producto })
    }
  
    modificarPorId(id, data) {
      console.log("Modificando equipo por id");
    }
  
    eliminarPorId(id) {
      console.log("Eliminando equipo por id");
    }
  }