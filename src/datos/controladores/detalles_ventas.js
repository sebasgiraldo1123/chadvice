import IBase from "../base.js";
import {Celular, DetallesVenta, Producto} from "../schemas.js";
import Productos from "./productos.js";
  
export default class DetallesVentas extends IBase {
    constructor() {
        super();
    }

    async agregar(venta, producto, cantidad) {
        const productoEncontrado = Productos.obtenerPorNombre(producto.nombre);
        return await DetallesVenta.create({
            idVenta: venta.idVenta,
            idProducto: productoEncontrado.idProducto,
            cantidad: cantidad,
            subTotal: productoEncontrado.precio * cantidad,
          }, {include: {"model": Producto, include: [Celular, Otro]}});
    }

    async obtenerTodos() {
        const productos = new Productos();
        const data = await productos.obtenerTodos();
        const listaCelulares = [];

    
        await Promise.all(data.map(async (producto) => {
            const celular = await this.obtenerPorId(producto.idCelular);
            if (celular) {
                const cel = {
                    id: producto.idCelular,
                    nombre: producto.nombre,
                    marca: celular.dataValues.marca,
                    pantalla: celular.dataValues.pantalla,
                    capacidadBateria: celular.dataValues.capacidadBateria,
                    camPrincipal: celular.dataValues.camPrincipal,
                    procesador: celular.dataValues.procesador,
                    memInterna: celular.dataValues.memInterna,
                    memRam: celular.dataValues.memRam,
                    tipo: celular.dataValues.tipo,
                    estado: celular.dataValues.estado,
                    porcentajeBateria: celular.dataValues.porcentajeBateria,
                    imagenTrasera: celular.dataValues.imagenTrasera,
                    imagenFrontal: celular.dataValues.imagenFrontal,
                    precio: producto.precio,
                    stock: producto.stock,
                    color: producto.color,
                };
                listaCelulares.push(cel);
            }
    }));

        return listaCelulares;
    }

    obtenerPorId(id) {
        return Celular.findByPk(id);
    }

    modificarPorId(id, data) {
        console.log("Modificando equipo por id");
    }

    eliminarPorId(id) {
        console.log("Eliminando equipo por id");
    }
}