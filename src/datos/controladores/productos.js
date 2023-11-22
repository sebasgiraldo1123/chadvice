import IBase from "../base.js";
import {Producto, Celular, Otro} from "../schemas.js";

export default class Productos extends IBase {
  constructor() {
    super();
  }

  agregar(data) {
    console.log("Agregando equipo");
  }

  async obtenerTodos() {
    const productos = await Producto.findAll();
    return productos.map(({dataValues}) => dataValues);
  }

  async obtenerPorId(id) {
    const producto = await Producto.findByPk(id, { include: [Celular, Otro] })
    if(!producto) return null;
    if(!producto.dataValues.Celular){
      const {Otro: {dataValues:dataOtro}, ...datos} = producto.dataValues;
      return {...datos, ...dataOtro};
    }else{
      const {Celular: {dataValues:dataCelular}, ...datos} = producto.dataValues;
      return {...datos, ...dataCelular};
    }
  }

  modificarPorId(id, data) {
    console.log("Modificando equipo por id");
  }

  eliminarPorId(id) {
    console.log("Eliminando equipo por id");
  }
}