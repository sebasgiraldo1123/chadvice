import Query from "./query.js";
import CelularsBD from "../../datos/controladores/celulares.js";

export default class FiltroCelular extends Query {
  constructor() {
    super();
    this.valores.set("tipo", null);
    this.valores.set("nombre", null);
    this.valores.set("marca", null);
    this.valores.set("camPrincipal", null);
    this.valores.set("procesador", null);
    this.valores.set("memInterna", null);
    this.valores.set("memRam", null);
    this.valores.set("precio", null);
  }

  async ejecutar() {
    const celulares = await new CelularsBD().obtenerTodos();
    const filtro = celulares
      .filter((celular) => {
        if (!this.valores.get("tipo")) return true;
        const tipo = this.valores.get("tipo") == "Nuevo" ? "n" : "e";
        return celular.tipo == tipo;
      })
      .filter((celular) =>
        this.valores.get("nombre")
          ? celular.nombre == this.valores.get("nombre")
          : true
      )
      .filter((celular) =>
        this.valores.get("marca")
          ? celular.marca == this.valores.get("marca")
          : true
      )
      .filter((celular) =>
        this.valores.get("camPrincipal")
          ? celular.camPrincipal == this.valores.get("camPrincipal")
          : true
      )
      .filter((celular) =>
        this.valores.get("procesador")
          ? celular.procesador == this.valores.get("procesador")
          : true
      )
      .filter((celular) =>
        this.valores.get("memInterna")
          ? celular.memInterna == this.valores.get("memInterna")
          : true
      )
      .filter((celular) =>
        this.valores.get("memRam")
          ? celular.memRam == this.valores.get("memRam")
          : true
      )
      .filter((celular) =>
        this.valores.get("precio")
          ? celular.precio == this.valores.get("precio")
          : true
      );

    return filtro.map((cel) => {
      return {
        text: `marca: ${cel.marca}\nprecio: ${cel.precio}$\nprocesador: ${cel.procesador}`,
      };
    });
  }
}
