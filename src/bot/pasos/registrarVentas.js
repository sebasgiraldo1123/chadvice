import { Ventas } from "../../datos/index.js";
import Query from "./query.js";

export default class RegistroVenta extends Query {
  constructor(numeroUsuario) {
    super();
    this.valores.set("numeroTelefonoUsuario", numeroUsuario);
    this.valores.set("productos", null);
    this.valores.set("cedulaCliente", null);
    this.valores.set("cedulaEmpleado", null);
  }

  limpiar() {
    this.valores.set("productos", null);    
    this.valores.set("cedula", null);
  }

  async ejecutar() {

    const ventas = new Ventas();
    const ventaRegistrada = await ventas.agregar(this.valores.get("cedulaCliente"), this.valores.get("cedulaEmpleado"), this.valores.get("productos"));

    console.log("-------------------------------------");
    console.log(ventaRegistrada);
    console.log("-------------------------------------");

    return [{ text: ` ${ventaRegistrada}` }];

  }
}
