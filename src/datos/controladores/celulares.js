import IBase from "../base.js";
import {Celular} from "../schemas.js";
import Productos from "./productos.js";
  
export default class Celulares extends IBase {
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