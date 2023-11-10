import Query from "./query.js";

export default class RegistroCelular extends Query {
  constructor() {
    super();
    this.valores.set("nombre", null);
    this.valores.set("cedula", null);
  }

  limpiar() {
    this.valores.set("nombre", null);    
    this.valores.set("cedula", null);
  }

  async ejecutar() {
    console.log("-------------------------------------");
    console.log(this.valores);
    console.log("-------------------------------------");

    return [{ text: ` ${this.valores.get("cedula")}` }];
  }
}
