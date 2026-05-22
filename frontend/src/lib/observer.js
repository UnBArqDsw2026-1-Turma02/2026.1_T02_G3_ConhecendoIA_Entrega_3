class Subject {
  constructor() {
    this.observers = [];
  }

  inscrever(observer) {
    // garante que o observer tem atualizar()
    if (typeof observer.atualizar !== "function") {
      throw new Error("Observer deve implementar o método atualizar()");
    }
    this.observers.push(observer);
  }

  desinscrever(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notificar(dados) {
    this.observers.forEach(obs => obs.atualizar(dados));
  }
}