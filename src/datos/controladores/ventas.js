import IBase from "../base.js";

import { Celular, Producto, DetallesVenta, Cliente, Empleado, Usuario, Otro, Venta} from "../schemas.js";

export default class Ventas extends IBase {
  constructor() {
    super();

  }

  agregar(data) {
    console.log("Agregando equipo");
  }

  async obtenerTodos() {
    const ventas = await Venta.findAll({
      include: [
        { model: Cliente, include: Usuario },
        { model: Empleado, include: Usuario },
        {
          model: DetallesVenta,
          include: [
            { model: Producto, include: Celular },
            { model: Producto, include: Otro },
          ],
        },
      ],
    });
  
    if (!ventas) return [];
  
    return ventas.map((venta) => {
      const { DetallesVenta, Cliente, Empleado, ...datos } = venta.dataValues;
      const detalles = DetallesVenta.map((detalle) => {
        const { Producto, ...detalleDatos } = detalle.dataValues;
        return {
          ...detalleDatos, ...Producto.dataValues
        };
      });
  
      return { ...datos, DetallesVenta: detalles, ...Cliente, ...Empleado };
    });
  }
  

  obtenerPorId(id) {
    return Celular.findByPk(id, { include: Producto });
  }

  async obtenerPorTipo(tipo) {
    const celulares = await Celular.findAll({
      where: { tipo },
      include: Producto,
    });
    if (!celulares) return [];
    return celulares.map((celular) => {
      const { Producto, ...datos } = celular.dataValues;
      return { ...datos, ...Producto.dataValues };
    });
  }

  modificarPorId(id, data) {
    console.log("Modificando equipo por id");
  }

  eliminarPorId(id) {
    console.log("Eliminando equipo por id");
  }
}
