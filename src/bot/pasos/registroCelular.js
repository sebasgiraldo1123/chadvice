import Query from "./query.js";

export default class RegistroCelular extends Query {
  constructor() {
    super();
    this.valores.set("nombre", null);
  }

  async ejecutar() {
    console.log("-------------------------------------");
    console.log(this.valores);
    console.log("-------------------------------------");

    return [{ text: "🤪" }];
  }
}
