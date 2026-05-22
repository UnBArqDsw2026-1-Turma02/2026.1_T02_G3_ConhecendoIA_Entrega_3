// ==========================================
// 1. AS CLASSES (Produto e Builder)
// ==========================================

class TopicoDiscussao {
  constructor() {
    this.id = null;
    this.titulo = "";
    this.categoria = "";
    this.tags = [];
    this.mensagem = "";
  }

  adicionarTag(tag) {
    if (tag && !this.tags.includes(tag.trim())) {
      this.tags.push(tag.trim());
    }
  }

  ehValido() {
    return this.titulo.length > 0 && this.categoria.length > 0 && this.mensagem.length > 0;
  }
}

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

  comTag(tag) {
    this.topico.adicionarTag(tag);
    return this;
  }

  setTagsEmLote(stringDeTags) {
    if (stringDeTags) {
      const tagsArray = stringDeTags.split(',');
      tagsArray.forEach(tag => this.topico.adicionarTag(tag));
    }
    return this;
  }

  build() {
    if (!this.topico.ehValido()) {
      throw new Error("Erro na publicação: Título, Categoria e Mensagem são obrigatórios.");
    }
    
    const resultado = this.topico;
    this.reset();
    return resultado;
  }
}

// ==========================================
// 2. OS TESTES (Jest)
// ==========================================

describe("Testes do Padrão Builder - TopicoDiscussao", () => {
  let builder;

  // Antes de cada teste, instanciamos um novo builder limpo
  beforeEach(() => {
    builder = new TopicoDiscussaoBuilder();
  });

  test("Deve criar um Tópico de Discussão com propriedades básicas", () => {
    // Ação
    const topico = builder
      .setId(1)
      .setTitulo("Dúvida sobre camadas em Redes Neurais")
      .setCategoria("Machine Learning")
      .setMensagem("Como defino o número correto de neurônios na camada oculta?")
      .build();

    // Verificação (Assert)
    expect(topico.id).toBe(1);
    expect(topico.titulo).toBe("Dúvida sobre camadas em Redes Neurais");
    expect(topico.categoria).toBe("Machine Learning");
    expect(topico.mensagem).toBe("Como defino o número correto de neurônios na camada oculta?");
  });

  test("Deve adicionar tags corretamente no tópico (individualmente e em lote)", () => {
    const topico = builder
      .setTitulo("Overfitting e Underfitting")
      .setCategoria("Deep Learning")
      .setMensagem("Minha rede neural está decorando os dados de treino.")
      .comTag("dúvida") // Adição individual
      .setTagsEmLote("redes neurais, overfitting") // Adição em lote (simulando input)
      .build();

    expect(topico.tags.length).toBe(3);
    expect(topico.tags).toContain("dúvida");
    expect(topico.tags).toContain("redes neurais");
    expect(topico.tags).toContain("overfitting");
  });

  test("Deve falhar e lançar um erro se os campos obrigatórios não forem preenchidos", () => {
    // Tenta fazer o build de um tópico faltando a categoria e a mensagem
    expect(() => {
      builder.setTitulo("Título sem contexto").build();
    }).toThrow("Erro na publicação: Título, Categoria e Mensagem são obrigatórios.");
  });

  test("Deve resetar o builder após chamar o build()", () => {
    // Cria o primeiro tópico completo e válido
    const topico1 = builder
      .setTitulo("Tópico 1")
      .setCategoria("Geral")
      .setMensagem("Mensagem do Tópico 1")
      .build();
    
    // Como o build() chama reset() internamente, o próximo uso deve iniciar limpo
    const topico2 = builder
      .setTitulo("Tópico 2")
      .setCategoria("Data Science")
      .setMensagem("Mensagem do Tópico 2")
      .build();

    expect(topico1.titulo).toBe("Tópico 1");
    expect(topico2.titulo).toBe("Tópico 2");
    
    // Garante que não herdou sujeira do Tópico 1 (o ID não foi setado no Tópico 2, deve ser null)
    expect(topico2.id).toBeNull(); 
  });
});