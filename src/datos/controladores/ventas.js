import IBase from "../base.js";

import { Celular, Producto, DetallesVenta, Cliente, Empleado, Usuario, Otro, Venta, Factura} from "../schemas.js";
import Clientes from "./clientes.js";
import DetallesVentas from "./detalles_ventas.js";
import Productos from "./productos.js";
import Empleados from "./empleados.js";
import Facturas from "./facturas.js";
// import { generarPDF_Base64 } from "../../funciones/PDF_utils.js";

export default class Ventas extends IBase {
  constructor() {
    super();

  }

  async agregar(idCliente, idEmpleado, productosVendidos) {

    const clientes = new Clientes();
    const empleados = new Empleados();
    const productos = new Productos();
    const ventas = new Ventas();
    const detallesVentas = new DetallesVentas();
    const facturas = new Facturas();

    const fechaActual = new Date();
    const cliente = await clientes.obtenerPorCedula(idCliente);
    const empleado = await empleados.obtenerPorCedula(idEmpleado);
    if (!cliente) return "El cliente no está registrado";
    if (!empleado) return "El empleado no está registrado";
    await productosVendidos.forEach(producto => {
      if (!productos.obtenerPorNombre(producto.nombre)) return "El producto no está registrado";
    });
    const ventaCreada = await ventas.agregar({
      idCliente: cliente.id,
      idEmpleado: empleado.id,
      fecha: fechaActual,
    });
    let detallesVenta = await productos.forEach(producto => {
      return detallesVentas.agregar(ventaCreada.idVenta, producto.idProducto, producto.cantidad);
    });

    let total;

    detallesVenta.forEach(detalle => {
      total += detalle.subtotal;
    });

    // const facturaDeVenta = facturas.agregar(ventaCreada.idVenta,total,fechaActual,"");
    // const pdfFactura = generarPDF_Base64(cliente, empleado, facturaDeVenta, detallesVenta);
    // facturas.modificarPorId(facturaDeVenta.idFactura, pdfFactura);
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
