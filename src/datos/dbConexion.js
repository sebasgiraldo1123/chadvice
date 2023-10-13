import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.NAME_DB,
  process.env.USER_DB,
  process.env.PASSWORD_DB,
  {
    host: process.env.HOST_DB,
    dialect: process.env.DIALECT_DB,
    define: {
      timestamps: true, // Esto permite que Sequelize agregue createdAt y updatedAt automáticamente
      underscored: true, // Esto convierte los nombres de columna de camelCase a snake_case
    },
  }
);
