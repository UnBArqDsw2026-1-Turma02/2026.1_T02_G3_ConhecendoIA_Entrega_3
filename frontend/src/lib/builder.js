// ============================================================
//  GOF CRIACIONAL: BUILDER
//  Contexto: ConhecendoIA – Plataforma de divulgação sobre IA
// ============================================================
//
//  Problema: Construir uma TrilhaAprendizagem envolve muitas
//  combinações de atributos (nível, objetivo, módulos, tema, etc.).
//  Usar um construtor com dezenas de parâmetros é frágil e ilegível.
//
//  Solução: O Builder separa a construção da representação,
//  permitindo criar trilhas passo a passo de forma fluente.
//
//  Nota: A classe Modulo é responsabilidade de outro membro da equipe.
//  Aqui ela é referenciada como dependência externa.
// ============================================================

// ---------- Produto ----------

/**
 * TrilhaAprendizagem
 *
 * Representa uma trilha de aprendizado sobre um tema de IA.
 * Objeto complexo construído pelo TrilhaAprendizagemBuilder.
 */
export class TrilhaAprendizagem {
  /**
   * @param {Object} params
   * @param {string} params.id
   * @param {string} params.nome
   * @param {string} params.titulo
   * @param {string} params.objetivo
   * @param {'iniciante'|'intermediario'|'avancado'} params.nivel
   * @param {string} params.temaIA
   * @param {Array}  params.modulos - instâncias de Modulo (classe de outro membro)
   */
  constructor({ id, nome, titulo, objetivo, nivel, temaIA, modulos }) {
    this.id = id;
    this.nome = nome;
    this.titulo = titulo;
    this.objetivo = objetivo;
    this.nivel = nivel;
    this.temaIA = temaIA;
    this.modulos = modulos;
  }

  adicionarModulo(modulo) {
    this.modulos.push(modulo);
  }

  /**
   * Recomenda a trilha ao usuário com base no nível de conhecimento dele.
   * @param {{ nivelConhecimento: 'iniciante'|'intermediario'|'avancado' }} usuario
   * @returns {boolean}
   */
  recomendarParaUsuario(usuario) {
    const niveis = { iniciante: 1, intermediario: 2, avancado: 3 };
    return niveis[this.nivel] <= niveis[usuario.nivelConhecimento];
  }
}

// ---------- Builder ----------

/**
 * TrilhaAprendizagemBuilder
 *
 * Constrói uma TrilhaAprendizagem passo a passo com API fluente.
 * Valida os campos obrigatórios antes de instanciar o produto.
 */
export class TrilhaAprendizagemBuilder {
  constructor() {
    this._id = null;
    this._nome = null;
    this._titulo = null;
    this._objetivo = null;
    this._nivel = "iniciante";
    this._temaIA = null;
    this._modulos = [];
  }

  comId(id) {
    this._id = id;
    return this;
  }

  comNome(nome) {
    this._nome = nome;
    return this;
  }

  comTitulo(titulo) {
    this._titulo = titulo;
    return this;
  }

  comObjetivo(objetivo) {
    this._objetivo = objetivo;
    return this;
  }

  comNivel(nivel) {
    const niveisValidos = ["iniciante", "intermediario", "avancado"];
    if (!niveisValidos.includes(nivel)) {
      throw new Error(`Nível inválido: "${nivel}". Use: ${niveisValidos.join(", ")}`);
    }
    this._nivel = nivel;
    return this;
  }

  comTemaIA(temaIA) {
    this._temaIA = temaIA;
    return this;
  }

  /**
   * Adiciona um módulo à trilha.
   * @param {Object} modulo - instância de Modulo (classe de outro membro da equipe)
   */
  adicionandoModulo(modulo) {
    this._modulos.push(modulo);
    return this;
  }

  /**
   * Valida os campos obrigatórios e instancia a TrilhaAprendizagem.
   * @returns {TrilhaAprendizagem}
   */
  build() {
    if (!this._id || !this._nome || !this._titulo || !this._objetivo || !this._temaIA) {
      throw new Error(
        "TrilhaAprendizagemBuilder: id, nome, titulo, objetivo e temaIA são obrigatórios."
      );
    }

    return new TrilhaAprendizagem({
      id: this._id,
      nome: this._nome,
      titulo: this._titulo,
      objetivo: this._objetivo,
      nivel: this._nivel,
      temaIA: this._temaIA,
      modulos: [...this._modulos],
    });
  }
}

// ---------- Director ----------

/**
 * TrilhaDirector
 *
 * Encapsula receitas de construção pré-definidas para trilhas
 * padrão da plataforma ConhecendoIA.
 */
export class TrilhaDirector {
  /** @param {TrilhaAprendizagemBuilder} builder */
  constructor(builder) {
    this.builder = builder;
  }

  criarTrilhaIntroRedesNeurais() {
    return this.builder
      .comId("trilha-rn-intro")
      .comNome("redes-neurais-basico")
      .comTitulo("Introdução a Redes Neurais")
      .comObjetivo("Capacitar o aluno a entender os fundamentos das redes neurais")
      .comNivel("iniciante")
      .comTemaIA("Redes Neurais")
      .build();
  }

  criarTrilhaDeepLearning() {
    return this.builder
      .comId("trilha-dl-avancado")
      .comNome("deep-learning-avancado")
      .comTitulo("Aprendizado Profundo – Nível Avançado")
      .comObjetivo("Dominar arquiteturas modernas de Deep Learning")
      .comNivel("avancado")
      .comTemaIA("Aprendizado Profundo")
      .build();
  }
}
