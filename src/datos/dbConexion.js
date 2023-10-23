import { Sequelize } from "sequelize";
import dotenv from "dotenv";



export const sequelize = new Sequelize(
  dotenv.config().parsed.DB_NAME,
  dotenv.config().parsed.USER_DB,
  dotenv.config().parsed.PASSWORD_DB,
  {
    host: process.env.HOST_DB,
    dialect: dotenv.config().parsed.DIALECT_DB,
    define: {
      timestamps: true, // Esto permite que Sequelize agregue createdAt y updatedAt automáticamente
      underscored: true, // Esto convierte los nombres de columna de camelCase a snake_case
    },
  }
);
