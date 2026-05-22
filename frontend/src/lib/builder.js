// Produto
class TrilhaAprendizagem {
  constructor() {
    this.id = null;
    this.nome = "";
    this.objetivo = "";
    this.nivel = "";
    this.modulos = [];
  }

  // Método do diagrama — pertence ao produto, não ao builder
  adicionarModulo(m) {
    this.modulos.push(m);
  }

  // Método do diagrama
  recomendarParaUsuario(u) {
    return this.nivel === u.nivel;
  }
}

// Builder
class TrilhaAprendizagemBuilder {
  constructor() {
    this.reset();
  }
}