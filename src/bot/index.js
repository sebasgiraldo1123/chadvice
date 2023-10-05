import Base from "./base.js";
import { EquiposDb } from "../datos/index.js";

export default class Bot extends Base {
  constructor() {
    super();
    this.equiposDb = new EquiposDb();
  }

  mensaje(prompt) {
    if (prompt === "ver equipos") return this.equiposDb.obtenerTodos();
  }
}
