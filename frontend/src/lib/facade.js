class Usuario {
  constructor(id, nome, email, senhaHash) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senhaHash = senhaHash;
  }

  login() {
    console.log(`${this.nome} fez login.`);
    return true;
  }

  logout() {
    console.log(`${this.nome} fez logout.`);
  }

  visualizarPerfil() {
    return { id: this.id, nome: this.nome, email: this.email };
  }
}

class Conteudo {
  constructor(id, titulo, descricao) {
    if (new.target === Conteudo) {
      throw new Error("Conteudo é uma classe abstrata e não pode ser instanciada diretamente.");
    }
    this.id = id;
    this.titulo = titulo;
    this.descricao = descricao;
    this.dataCriacao = new Date();
  }

  exibir() {
    throw new Error("exibir() deve ser implementado pela subclasse.");
  }

  avaliar() {
    throw new Error("avaliar() deve ser implementado pela subclasse.");
  }
}

class RecursoInterativo extends Conteudo {
  constructor(id, titulo, descricao) {
    super(id, titulo, descricao);
  }

  exibir() {
    console.log(`[RecursoInterativo] Exibindo: ${this.titulo}`);
  }

  avaliar() {
    console.log(`[RecursoInterativo] Avaliando: ${this.titulo}`);
  }

  iniciar(usuario) {
    console.log(`[RecursoInterativo] ${usuario.nome} iniciou "${this.titulo}"`);
  }

  avaliarInteracao(usuario) {
    console.log(`[RecursoInterativo] Interação de ${usuario.nome} em "${this.titulo}" avaliada.`);
  }
}

class Modulo {
  constructor(id, titulo, objetivo) {
    this.id = id;
    this.titulo = titulo;
    this.objetivo = objetivo;
    this.conteudos = [];
  }

  adicionarConteudo(conteudo) {
    if (!(conteudo instanceof Conteudo)) {
      throw new Error("Apenas instâncias de Conteudo podem ser adicionadas.");
    }
    this.conteudos.push(conteudo);
  }

  organizarSequencia() {
    this.conteudos.sort((a, b) => a.dataCriacao - b.dataCriacao);
  }
}

class Discussao {
  constructor(id, nome, objetivo, nivel) {
    this.id = id;
    this.nome = nome;
    this.objetivo = objetivo;
    this.nivel = nivel;
    this.modulos = [];
  }

  adicionarModulo(modulo) {
    if (!(modulo instanceof Modulo)) {
      throw new Error("Apenas instâncias de Modulo podem ser adicionadas.");
    }
    this.modulos.push(modulo);
  }

  recomendarParaUsuario(usuario) {
    console.log(`Discussão "${this.nome}" recomendada para ${usuario.nome}.`);
    return true;
  }
}

class DiscussaoBuilder {
  setId(id)           { this._id = id;           return this; }
  setNome(nome)       { this._nome = nome;       return this; }
  setObjetivo(obj)    { this._objetivo = obj;    return this; }
  setNivel(nivel)     { this._nivel = nivel;     return this; }

  build() {
    if (!this._id || !this._nome) {
      throw new Error("id e nome são obrigatórios para construir uma Discussao.");
    }
    return new Discussao(this._id, this._nome, this._objetivo, this._nivel);
  }
}

class TemaIA {
  constructor(id, area, descricao) {
    this.id = id;
    this.area = area;
    this.descricao = descricao;
    this.conteudos = [];
    this.subtemas = [];
  }

  relacionarConteudos(conteudos) {
    conteudos.forEach(c => {
      if (!(c instanceof Conteudo)) {
        throw new Error(`"${c}" não é uma instância de Conteudo.`);
      }
      this.conteudos.push(c);
    });
  }

  listarSubtemas() {
    return this.subtemas;
  }
}

class Progresso {
  constructor(usuario, discussao) {
    this.usuario = usuario;
    this.discussao = discussao;
    this._percentualConcluido = 0;
    this.ultimoAcesso = new Date();
    this._observers = [];
  }

  get percentualConcluido() {
    return this._percentualConcluido;
  }

  get desempenho() {
    if (this._percentualConcluido >= 80) return "Excelente";
    if (this._percentualConcluido >= 50) return "Bom";
    return "Em progresso";
  }

  inscrever(observer) {
    this._observers.push(observer);
  }

  registrarAvanco(valor) {
    this._percentualConcluido = Math.min(100, this._percentualConcluido + valor);
    this.ultimoAcesso = new Date();
    this._observers.forEach(o => o.atualizar(this));
  }

  gerarRelatorio() {
    return `Usuário: ${this.usuario.nome} | Discussão: ${this.discussao.nome} | Progresso: ${this._percentualConcluido}% | Desempenho: ${this.desempenho}`;
  }
}

class NotificacaoEmailObserver {
  atualizar(progresso) {
    console.log(`[Email] ${progresso.usuario.nome}: progresso atualizado para ${progresso.percentualConcluido}% em "${progresso.discussao.nome}".`);
  }
}

class DiscussaoService {
  constructor() {
    this.discussoes = new Map();
  }

  criar(id, nome, objetivo, nivel) {
    const discussao = new DiscussaoBuilder()
      .setId(id)
      .setNome(nome)
      .setObjetivo(objetivo)
      .setNivel(nivel)
      .build();
    this.discussoes.set(id, discussao);
    return discussao;
  }

  adicionarModulo(discussao, modulo) {
    discussao.adicionarModulo(modulo);
  }

  buscar(id) {
    return this.discussoes.get(id) ?? null;
  }

  listar() {
    return [...this.discussoes.values()];
  }
}

class UsuarioService {
  constructor() {
    this.usuarios = new Map();
  }

  cadastrar(id, nome, email, senhaHash) {
    const usuario = new Usuario(id, nome, email, senhaHash);
    this.usuarios.set(id, usuario);
    return usuario;
  }

  buscar(id) {
    return this.usuarios.get(id) ?? null;
  }
}

class ProgressoService {
  constructor() {
    this.progressos = new Map();
  }

  _chave(usuarioId, discussaoId) {
    return `${usuarioId}-${discussaoId}`;
  }

  iniciar(usuario, discussao) {
    const chave = this._chave(usuario.id, discussao.id);
    if (this.progressos.has(chave)) {
      throw new Error(`Progresso já iniciado para "${usuario.nome}" na discussão "${discussao.nome}".`);
    }
    const progresso = new Progresso(usuario, discussao);
    progresso.inscrever(new NotificacaoEmailObserver());
    this.progressos.set(chave, progresso);
    return progresso;
  }

  registrarAvanco(usuarioId, discussaoId, valor) {
    const progresso = this.progressos.get(this._chave(usuarioId, discussaoId));
    if (!progresso) {
      throw new Error(`Progresso não encontrado para usuário ${usuarioId} na discussão ${discussaoId}.`);
    }
    progresso.registrarAvanco(valor);
  }

  buscar(usuarioId, discussaoId) {
    return this.progressos.get(this._chave(usuarioId, discussaoId)) ?? null;
  }
}

class TemaService {
  constructor() {
    this.temas = new Map();
  }

  cadastrar(id, area, descricao) {
    const tema = new TemaIA(id, area, descricao);
    this.temas.set(id, tema);
    return tema;
  }

  buscar(id) {
    return this.temas.get(id) ?? null;
  }

  listar() {
    return [...this.temas.values()];
  }
}

class PlataformaConhecendoIA {
  constructor(nome, url) {
    this.nome = nome;
    this.url = url;
    this._discussaoService  = new DiscussaoService();
    this._usuarioService    = new UsuarioService();
    this._progressoService  = new ProgressoService();
    this._temaService       = new TemaService();
  }

  inicializar() {
    console.log(`Plataforma "${this.nome}" inicializada em ${this.url}.`);
  }

  apresentarHome() {
    console.log(`Home da plataforma "${this.nome}": ${this.discussoes().length} discussões disponíveis.`);
  }

  // --- Usuário ---
  cadastrarUsuario(id, nome, email, senhaHash) {
    return this._usuarioService.cadastrar(id, nome, email, senhaHash);
  }

  buscarUsuario(id) {
    return this._usuarioService.buscar(id);
  }

  // --- Discussão ---
  criarDiscussao(id, nome, objetivo, nivel) {
    return this._discussaoService.criar(id, nome, objetivo, nivel);
  }

  adicionarModuloNaDiscussao(discussao, modulo) {
    this._discussaoService.adicionarModulo(discussao, modulo);
  }

  buscarDiscussao(id) {
    return this._discussaoService.buscar(id);
  }

  discussoes() {
    return this._discussaoService.listar();
  }

  // --- Progresso ---
  iniciarProgresso(usuario, discussao) {
    return this._progressoService.iniciar(usuario, discussao);
  }

  registrarAvanco(usuarioId, discussaoId, valor) {
    this._progressoService.registrarAvanco(usuarioId, discussaoId, valor);
  }

  consultarProgresso(usuarioId, discussaoId) {
    return this._progressoService.buscar(usuarioId, discussaoId);
  }

  // --- Tema ---
  cadastrarTema(id, area, descricao) {
    return this._temaService.cadastrar(id, area, descricao);
  }

  buscarTema(id) {
    return this._temaService.buscar(id);
  }

  listarTemas() {
    return this._temaService.listar();
  }
}

// =========================================================
// USO — o cliente só conhece PlataformaConhecendoIA
// =========================================================

const plataforma = new PlataformaConhecendoIA("Conhecendo IA", "https://conhecendoia.com");
plataforma.inicializar();

const arthur = plataforma.cadastrarUsuario(1, "Arthur", "arthur@email.com", "hash123");

const discussao = plataforma.criarDiscussao("d1", "Fundamentos de IA", "Aprender IA do zero", "iniciante");

const modulo1 = new Modulo("m1", "Introdução", "Entender o que é IA");
const recurso1 = new RecursoInterativo("r1", "O que é IA?", "Conceitos fundamentais de inteligência artificial");
modulo1.adicionarConteudo(recurso1);
plataforma.adicionarModuloNaDiscussao(discussao, modulo1);

plataforma.cadastrarTema("t1", "Redes Neurais", "Como as redes neurais aprendem");
plataforma.cadastrarTema("t2", "Machine Learning", "Algoritmos de aprendizado de máquina");

plataforma.iniciarProgresso(arthur, discussao);
plataforma.registrarAvanco(arthur.id, discussao.id, 60);
plataforma.registrarAvanco(arthur.id, discussao.id, 40);

const progresso = plataforma.consultarProgresso(arthur.id, discussao.id);
console.log(progresso.gerarRelatorio());

recurso1.iniciar(arthur);
recurso1.avaliarInteracao(arthur);

plataforma.apresentarHome();