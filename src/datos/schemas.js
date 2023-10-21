import { DataTypes } from "sequelize";
import { sequelize } from "./dbConexion.js"; // Importa la instancia de Sequelize creada anteriormente


// Definimos los esquemas de las tablas para la base de datos
export const Celular = sequelize.define(
  "Celular",
  {
    idCelular: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    marca:{
      type: DataTypes.STRING(35),
      allowNull: false,
    },
    pantalla:{
      type: DataTypes.STRING(3),
      allowNull: false,
    },
    capacidadBateria:{
      type: DataTypes.STRING(4),
      allowNull: false,
    },
    camPrincipal:{
      type: DataTypes.STRING(3),
      allowNull: false,
    },
    procesador:{
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    memInterna:{
      type: DataTypes.STRING(6),
      allowNull: false,
    },
    memRam:{
      type: DataTypes.STRING(6),
      allowNull: false,
    },
    tipo:{
      type: DataTypes.STRING(1),
      allowNull: false,
    },
    estado:{
      type: DataTypes.STRING(15)
    },
    porcentajeBateria:{
      type: DataTypes.STRING(4)
    },
    imagenTrasera:{
      type: DataTypes.STRING(150),
    },
    imagenFrontal:{
      type: DataTypes.STRING(150),
    },
  },
  {
    tableName: "Celular"
  }
);

export const Otro = sequelize.define(
  "Otro",
  {
    idOtro: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    descripcion:{
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    categoria:{
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    imagenProducto:{
      type: DataTypes.STRING(150),
    },
  },
  {
    tableName: "Otro"
  },
);

export const Producto = sequelize.define(
  "Producto",
  {
    idProducto: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    idCelular: {
      type: DataTypes.SMALLINT,
      unique: true
    },
    idOtro: {
      type: DataTypes.SMALLINT,
      unique: true
    },
    nombre:{
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    precio:{
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stock:{
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    color:{
      type: DataTypes.STRING(15),
      allowNull: false,
    }
  },
  {
    tableName: "Producto"
  }
);

export const Usuario = sequelize.define(
  "Usuario",
  {
    idUsuario: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre:{
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    cedula:{
      type: DataTypes.STRING(11),
      allowNull: false,
      unique: true
    },
    correo:{
      type: DataTypes.STRING(60),
      allowNull: false,
      unique: true
    },
    contrasena:{
      type: DataTypes.STRING(60),
      allowNull: false,
      unique: true
    },
    direccion:{
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    telefono:{
      type: DataTypes.STRING(60),
      allowNull: false,
      unique: true
    },
    fechaNacimiento:{
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "Usuario"
  }
);

export const Cliente = sequelize.define(
  "Cliente",
  {
    idCliente: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    idUsuario: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      unique: true
    },
    metodoPago:{
      type: DataTypes.STRING(25),
      allowNull: false,
    },
  },
  {
    tableName: "Cliente"
  }
);

export const Empleado = sequelize.define(
  "Empleado",
  {
    idEmpleado: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    idUsuario: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      unique: true
    },
    admin:{
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    cargo: {
      type: DataTypes.STRING(15),
      allowNull: false,
    }
  },
  {
    tableName: "Empleado"
  }
);

export const Venta = sequelize.define(
  "Venta",
  {
    idVenta: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    idCliente: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    idEmpleado: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "Venta"
  }
);

export const DetallesVenta = sequelize.define(
  "DetallesVenta",
  {
    idDetallesVenta: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    idVenta: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    idProducto: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    cantidadProducto: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    subTotal: {
      type: DataTypes.FLOAT,
      allowNull: false,
    }
  },
  {
    tableName: "DetallesVenta"
  },
);

export const Factura = sequelize.define(
  "Factura",
  {
    idFactura: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    idVenta: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    archivo:{
      type: DataTypes.STRING(100000),
      allowNull: false,
    }  
  },
  {
    tableName: "Factura"
  }
);


// Crea las tablas en la base de datos si no existen
export function crearEsquemas() {
  //Relaciones
  Celular.hasOne(Producto, {foreignKey: 'idCelular'});
  Otro.hasOne(Producto, {foreignKey: 'idOtro'});
  Usuario.hasOne(Cliente, {foreignKey: 'idUsuario'});
  Usuario.hasOne(Empleado, {foreignKey: 'idUsuario'});
  Empleado.hasOne(Empleado, {foreignKey: 'admin'});
  Venta.hasOne(Factura, {foreignKey: 'idVenta'});
  Empleado.hasMany(Venta, {foreignKey: 'idEmpleado'});
  Cliente.hasMany(Venta, {foreignKey: 'idCliente'});
  Venta.hasMany(DetallesVenta, {foreignKey: 'idVenta'});
  Producto.hasMany(DetallesVenta, {foreignKey: 'idProducto'});
  //--------------------------------------------------
  //Se crean las tablas
  Celular.sync();
  Otro.sync();
  Producto.sync();
  Usuario.sync();
  Cliente.sync();
  Empleado.sync();
  Venta.sync();
  DetallesVenta.sync();
  Factura.sync();
  console.log("Se crean las tablas");
}


