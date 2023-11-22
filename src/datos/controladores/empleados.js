import IBase from "../base.js";
import { Usuario, Empleado } from "../schemas.js";
  
export default class Empleados extends IBase {
    constructor() {
        super();
    }

    agregar(data) {
        console.log("Agregando equipo");
    }

    async obtenerTodos() {
        const empleados = await Empleado.findAll({ include: Usuario });
        if (!empleados) return [];
        return empleados.map((empleado) => {
          const { Usuario, ...datos } = empleado.dataValues;
          return { ...datos, ...Usuario.dataValues };
        });
    }

    async obtenerPorId(id) {
        const empleado = await Empleado.findByPk(id, { include: Usuario });
        if (!empleado) return null;
        const { Usuario: { dataValues: usuarioDataValues }, ...datos } = empleado.dataValues;
        return { ...datos, ...usuarioDataValues}
    }

    async obtenerPorCedula(cedula) {
        const empleado = await Empleado.findOne({include: {model: Usuario, where: {cedula: cedula}}});
        if (!empleado) return null;
        const { Usuario: { dataValues: usuarioDataValues }, ...datos } = empleado.dataValues;
        return { ...datos, ...usuarioDataValues}
    }

    modificarPorId(id, data) {
        console.log("Modificando equipo por id");
    }

    eliminarPorId(id) {
        console.log("Eliminando equipo por id");
    }
}