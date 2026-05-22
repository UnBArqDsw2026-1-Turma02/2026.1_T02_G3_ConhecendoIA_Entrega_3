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
