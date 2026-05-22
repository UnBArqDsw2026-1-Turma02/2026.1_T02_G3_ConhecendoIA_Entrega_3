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

  reset() {
    this.trilha = new TrilhaAprendizagem();
    return this;
  }

  setId(id) {
    this.trilha.id = id;
    return this;
  }

  setNome(nome) {
    this.trilha.nome = nome;
    return this;
  }

  setObjetivo(objetivo) {
    this.trilha.objetivo = objetivo;
    return this;
  }

  setNivel(nivel) {
    this.trilha.nivel = nivel;
    return this;
  }

  // Builder delega ao método do produto
  comModulo(modulo) {
    this.trilha.adicionarModulo(modulo);
    return this;
  }

  build() {
    const resultado = this.trilha;
    this.reset();
    return resultado;
  }
}