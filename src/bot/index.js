import Base from "./base.js";
import { ProductosDb } from "../datos/index.js";

export default class Bot extends Base {
  constructor() {
    super();
    this.productosDb = new ProductosDb();
  }

  mensaje(prompt) {
    if (prompt === "ver equipos") return this.productosDb.obtenerTodos();
  }
}
