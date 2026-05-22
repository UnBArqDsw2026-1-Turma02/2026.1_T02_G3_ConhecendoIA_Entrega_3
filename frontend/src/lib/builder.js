// Produto
class TrilhaAprendizagem {
  constructor() {
    this.id = null;
    this.nome = "";
    this.objetivo = "";
    this.nivel = "";
    this.modulos = [];
  }
}

// Builder
class TrilhaAprendizagemBuilder {
  constructor() {
    this.reset();
  }
}