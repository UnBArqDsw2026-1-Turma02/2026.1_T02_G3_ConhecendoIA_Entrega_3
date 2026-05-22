// Produto: Representa a discussão que será publicada no fórum
class TopicoDiscussao {
  constructor() {
    this.id = null;
    this.titulo = "";
    this.categoria = "";
    this.tags = [];
    this.mensagem = "";
  }

  // Método do diagrama — pertence ao produto
  adicionarTag(tag) {
    if (tag && !this.tags.includes(tag)) {
      this.tags.push(tag.trim());
    }
  }

  // Método de domínio - ex: verificar se o tópico tem o mínimo para ser postado
  ehValido() {
    return this.titulo.length > 0 && this.categoria.length > 0 && this.mensagem.length > 0;
  }
}

// Builder: Foca em construir o tópico passo a passo
class TopicoDiscussaoBuilder {
  constructor() {
    this.reset();
  }

  reset() {
    this.topico = new TopicoDiscussao();
    return this;
  }

  setId(id) {
    this.topico.id = id;
    return this;
  }

  setTitulo(titulo) {
    this.topico.titulo = titulo;
    return this;
  }

  setCategoria(categoria) {
    this.topico.categoria = categoria;
    return this;
  }

  setMensagem(mensagem) {
    this.topico.mensagem = mensagem;
    return this;
  }

  // Pode ser usado caso as tags sejam inseridas uma a uma
  comTag(tag) {
    this.topico.adicionarTag(tag);
    return this;
  }

  // Método auxiliar útil baseado no seu UI, que recebe uma string separada por vírgulas 
  // (Ex: "algorítmos, regressao") e converte para o array do Produto
  setTagsEmLote(stringDeTags) {
    if (stringDeTags) {
      const tagsArray = stringDeTags.split(',');
      tagsArray.forEach(tag => this.topico.adicionarTag(tag));
    }
    return this;
  }

  build() {
    // Garante que o objeto não seja construído pela metade antes de ir pro backend
    if (!this.topico.ehValido()) {
      throw new Error("Erro na publicação: Título, Categoria e Mensagem são obrigatórios.");
    }
    
    const resultado = this.topico;
    this.reset();
    return resultado;
  }
}