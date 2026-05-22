// SUBSISTEMAS INTERNOS (o cliente não acessa diretamente)

class TrilhaService {
  criarTrilha(id, nome, objetivo, nivel) {
    return new TrilhaAprendizagemBuilder()
      .setId(id)
      .setNome(nome)
      .setObjetivo(objetivo)
      .setNivel(nivel)
      .build();
  }

  adicionarModuloNaTrilha(trilha, modulo) {
    trilha.adicionarModulo(modulo);
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

  iniciar(usuario) {
    const progresso = new Progresso(usuario);
    progresso.inscrever(new NotificacaoEmailObserver());
    progresso.inscrever(new GamificacaoObserver());
    this.progressos.set(usuario.id, progresso);
    return progresso;
  }

  registrarAvanco(usuarioId, valor) {
    const progresso = this.progressos.get(usuarioId);
    if (!progresso) throw new Error(`Progresso não encontrado para usuário ${usuarioId}`);
    progresso.registrarAvanco(valor);
  }

  buscar(usuarioId) {
    return this.progressos.get(usuarioId) ?? null;
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

  listar() {
    return [...this.temas.values()];
  }
}

class PlataformaFacade {
  constructor() {
    this.trilhaService   = new TrilhaService();
    this.usuarioService  = new UsuarioService();
    this.progressoService = new ProgressoService();
    this.temaService     = new TemaService();
  }

  // --- Usuário ---
  cadastrarUsuario(id, nome, email, senhaHash) {
    return this.usuarioService.cadastrar(id, nome, email, senhaHash);
  }

  // --- Trilha ---
  criarTrilha(id, nome, objetivo, nivel) {
    return this.trilhaService.criarTrilha(id, nome, objetivo, nivel);
  }

  adicionarModulo(trilha, modulo) {
    this.trilhaService.adicionarModuloNaTrilha(trilha, modulo);
  }

  // --- Progresso ---
  iniciarProgresso(usuario) {
    return this.progressoService.iniciar(usuario);
  }

  registrarAvanco(usuarioId, valor) {
    this.progressoService.registrarAvanco(usuarioId, valor);
  }

  consultarProgresso(usuarioId) {
    return this.progressoService.buscar(usuarioId);
  }

  // --- Tema ---
  cadastrarTema(id, area, descricao) {
    return this.temaService.cadastrar(id, area, descricao);
  }

  listarTemas() {
    return this.temaService.listar();
  }
}

// =========================================================
// USO — o cliente só conhece PlataformaFacade
// =========================================================

const plataforma = new PlataformaFacade();

const arthur = plataforma.cadastrarUsuario(1, "Arthur", "arthur@email.com", "hash123");

const trilha = plataforma.criarTrilha("t1", "Fundamentos de IA", "Aprender IA do zero", "iniciante");

plataforma.cadastrarTema("tema1", "Redes Neurais", "Como as redes neurais aprendem");
plataforma.cadastrarTema("tema2", "Machine Learning", "Algoritmos de aprendizado de máquina");

plataforma.iniciarProgresso(arthur);
plataforma.registrarAvanco(arthur.id, 60);
plataforma.registrarAvanco(arthur.id, 40);

const progresso = plataforma.consultarProgresso(arthur.id);
console.log(`Progresso de ${arthur.nome}: ${progresso.percentualConcluido}% — ${progresso.desempenho}`);
