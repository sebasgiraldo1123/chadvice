import { DataTypes } from "sequelize";
import { sequelize } from "./dbConexion.js"; // Importa la instancia de Sequelize creada anteriormente

export const Producto = sequelize.define(
  "Producto",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    precio: {
      type: DataTypes.REAL,
      allowNull: false,
    },
    Ram: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "Ram",
    },

    "memori_ interna": {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pantalla: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    camara_principal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    "capacida_ bateria": {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    poorcentaje_bateria: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "Producto", // Especifica el nombre de la tabla aquí
    timestamps: false, // Deshabilita la marca de tiempo
  }
);

export function crearEsquemas() {
  Producto.sync(); // Esto crea la tabla en la base de datos si no existe
}
