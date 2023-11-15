import Query from "./query.js";

export default class RegistroVenta extends Query {
  constructor(numeroUsuario) {
    super();
    this.valores.set("numeroTelefonoUsuario", numeroUsuario);
    this.valores.set("productos", null);
    this.valores.set("cedula", null);
  }

  limpiar() {
    this.valores.set("productos", null);    
    this.valores.set("cedula", null);
  }

  async ejecutar() {
    console.log("-------------------------------------");
    console.log(this.valores);
    console.log("-------------------------------------");

    return [{ text: ` ${this.valores.get("numeroTelefonoUsuario")}` }];
  }
}
