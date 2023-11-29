import IBase from "../base.js";
import {Factura, Venta} from "../schemas.js";
  
export default class Facturas extends IBase {
    constructor() {
        super();
    }

    async agregar(idVenta, total, fecha, pdf = "") {
        const factura = await Factura.create({
            idVenta: idVenta,
            total: total,
            fecha: fecha,
            archivo: pdf
        });
        return factura;
    }

    async obtenerTodos() {
       const facturas = await Factura.findAll({include: {model: Venta}});
       if (!facturas) return null;
       return facturas.map((factura) => {
        const {Ventum, ...datos} = factura.dataValues;
        const datosVenta = Ventum.dataValues;
        return { ...datos, ...datosVenta };  
       });
    }

    async obtenerPorId(id) {
        const factura = await Factura.findByPk(id,{include: Venta});
        if (!factura) return null;
       const {VentaAsociada, ...datos} = factura.dataValues;
       const datosVenta = VentaAsociada.dataValues;
       return { ...datos, ...datosVenta };
    }

    modificarPorId(id, data) {
        console.log("Modificando equipo por id");
    }

    eliminarPorId(id) {
        console.log("Eliminando equipo por id");
    }
}