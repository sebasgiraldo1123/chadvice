import IBase from "../base.js";
import {Otro} from "../schemas.js";
import Productos from "./productos.js";

export default class Otros extends IBase {
    constructor() {
      super();
      console.log("");
    }
  
    agregar(data) {
      console.log("Agregando equipo");
    }
  
    async obtenerTodos() {
        const productos = new Productos();
        const data = await productos.obtenerTodos();
        const listaOtros = [];
    
        await Promise.all(data.map(async (o) => {
            const ot = await this.obtenerPorId(o.idOtro);
            if (ot) {
                const other = {
                    id: o.idProducto,
                    nombre: o.nombre,
                    descripcion: ot.dataValues.descripcion,
                    categoria: ot.dataValues.categoria,
                    imagenProducto: ot.dataValues.imagenProducto,
                    precio: o.precio,
                    stock: o.stock,
                    color: o.color,
                };
                listaOtros.push(other);
            }
        }));

        return listaOtros;
    }
  
    obtenerPorId(id) {
      return Otro.findByPk(id);
    }
  
    modificarPorId(id, data) {
      console.log("Modificando equipo por id");
    }
  
    eliminarPorId(id) {
      console.log("Eliminando equipo por id");
    }
  }