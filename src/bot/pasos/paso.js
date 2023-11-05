export default class Paso {
  constructor(id, valor, mensaje) {
    this.id = id;
    this.valor = valor;
    this.mensaje = mensaje;
  }

  aMensajes() {
    return [{ text: this.mensaje }];
  }
}
