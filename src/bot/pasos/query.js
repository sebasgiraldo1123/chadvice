export default class Query {
  constructor() {
    this.valores = new Map();
  }

  set(key, value) {
    this.valores.set(key, value);
  }

  ejecutar() {
    throw new Error("Not implemented");
  }
}
