import { where } from "sequelize";
import IBase from "../base.js";
import {Cliente, Usuario} from "../schemas.js";
  
export default class Clientes extends IBase {
    constructor() {
        super();
    }

    agregar(data) {
        console.log("Agregando equipo");
    }

    async obtenerTodos() {
        const clientes = await Cliente.findAll({ include: Usuario });
        if (!clientes) return [];
        return clientes.map((cliente) => {
          const { Usuario, ...datos } = cliente.dataValues;
          return { ...datos, ...Usuario.dataValues };
        });
    }

    async obtenerPorId(id) {
        const cliente = await Cliente.findByPk(id, { include: Usuario });
        if (!cliente) return null;
        const { Usuario: { dataValues: usuarioDataValues }, ...datos } = cliente.dataValues;
        return { ...datos, ...usuarioDataValues}
    }

    async obtenerPorCedula(cedula) {
        const cliente = await Cliente.findOne({include: {model: Usuario, where: {cedula: cedula}}});
        if (!cliente) return null;
        const { Usuario: { dataValues: usuarioDataValues }, ...datos } = cliente.dataValues;
        return { ...datos, ...usuarioDataValues}
    }
 
    modificarPorId(id, data) {
        console.log("Modificando equipo por id");
    }

    eliminarPorId(id) {
        console.log("Eliminando equipo por id");
    }
}