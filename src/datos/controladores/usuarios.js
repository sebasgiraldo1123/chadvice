import IBase from "../base.js";
import { Celular, Usuario } from "../schemas.js";
import Productos from "./productos.js";

export default class Usuarios extends IBase {
  constructor() {
    super();
  }

  async agregar(nuevoUsuario) {
    const idUsuario = await Usuario.max("idUsuario");
    nuevoUsuario.idUsuario = idUsuario + 1;
    return Usuario.create(nuevoUsuario)
      .then((usuarioCreado) => {
        console.log("Usuario creado con éxito:", usuarioCreado.dataValues);
        return usuarioCreado.dataValues;
      })
      .catch((error) => {
        console.error("Error al crear el usuario:", error);
        return null;
      });
  }

  async obtenerTodos() {
    const productos = new Productos();
    const data = await productos.obtenerTodos();
    const listaCelulares = [];

    await Promise.all(
      data.map(async (producto) => {
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
      })
    );

    return listaCelulares;
  }

  obtenerPorId(id) {
    return Celular.findByPk(id);
  }

  async obtenerPorTelefono(telefono) {
    const usuario = await Usuario.findOne({ where: { telefono } });
    return usuario?.dataValues;
  }

  async modificarPorId(idUsuario, data) {
    Usuario.update(data, { where: { idUsuario } });
  }

  eliminarPorId(id) {
    console.log("Eliminando equipo por id");
  }
}
