import IBase from "../base.js";

import { Celular, Producto, DetallesVenta, Cliente, Empleado, Usuario, Otro, Venta} from "../schemas.js";
import DetallesVentas from "./detalles_ventas.js";
import Productos from "./productos.js";

export default class Ventas extends IBase {
  constructor() {
    super();

  }

  async agregar(idCliente, idEmpleado, productos) {
    const fechaActual = new Date();
    const cliente = await Cliente.obtenerPorCedula(idCliente);
    const empleado = await Empleado.obtenerPorCedula(idEmpleado);
    if (!cliente) return "El cliente no está registrado";
    if (!empleado) return "El empleado no está registrado";
    await productos.forEach(producto => {
      if (!Productos.obtenerPorNombre(producto.nombre)) return "El producto no está registrado";
    });
    const ventaCreada = await Venta.create({
      idCliente: cliente.id,
      idEmpleado: empleado.id,
      fecha: fechaActual,
    });
    const detallesVenta = await productos.forEach(producto => {
      return DetallesVentas.agregar(ventaCreada, producto, producto.cantidad);
    });
    return detallesVenta;
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
  

  async obtenerPorId(id) {
    return Venta.findByPk(id, { include: [
      { model: Cliente, include: Usuario },
      { model: Empleado, include: Usuario },
      {
        model: DetallesVenta,
        include: [
          { model: Producto, include: [Celular, Otro ]}
        ],
      },
    ],
    });
  }


  modificarPorId(id, data) {
    console.log("Modificando equipo por id");
  }

  eliminarPorId(id) {
    console.log("Eliminando equipo por id");
  }
}
