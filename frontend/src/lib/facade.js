// ============================================================
//  GOF ESTRUTURAL: FACADE
//  Contexto: ConhecendoIA – Plataforma de divulgação sobre IA
// ============================================================
//
//  Problema: A PlataformaConhecendoIA precisa coordenar múltiplos
//  subsistemas (autenticação, catálogo de conteúdo, rastreamento
//  de progresso e notificações) toda vez que um usuário interage.
//  Expor cada subsistema diretamente cria alto acoplamento.
//
//  Solução: A Facade oferece uma interface unificada e simplificada
//  que orquestra todos esses subsistemas internamente, deixando o
//  código cliente limpo e desacoplado.
// ============================================================

// ============================================================
//  SUBSISTEMAS (complexidade interna)
// ============================================================

/**
 * SubsistemaAutenticacao
 * Responsável pelo login, logout e verificação de sessão.
 */
class SubsistemaAutenticacao {
  constructor() {
    this._sessaoAtiva = new Map(); // userId → token
  }

  login(usuario) {
    if (!usuario.email || !usuario.senhaHash) {
      throw new Error("Credenciais inválidas.");
    }
    const token = `token-${usuario.id}-${Date.now()}`;
    this._sessaoAtiva.set(usuario.id, token);
    console.log(`  [Auth] Usuário "${usuario.nome}" autenticado. Token gerado.`);
    return token;
  }

  logout(usuario) {
    this._sessaoAtiva.delete(usuario.id);
    console.log(`  [Auth] Usuário "${usuario.nome}" desconectado.`);
  }

  verificarSessao(usuarioId) {
    const ativo = this._sessaoAtiva.has(usuarioId);
    console.log(`  [Auth] Sessão de usuário ${usuarioId}: ${ativo ? "ativa ✅" : "expirada ❌"}`);
    return ativo;
  }
}

/**
 * SubsistemaConteudo
 * Gerencia o catálogo de temas, trilhas e módulos.
 */
class SubsistemaConteudo {
  constructor() {
    this._catalogo = [
      { id: "t1", temaIA: "Redes Neurais", nivel: "iniciante", titulo: "Intro a Redes Neurais" },
      { id: "t2", temaIA: "Machine Learning", nivel: "intermediario", titulo: "ML na Prática" },
      { id: "t3", temaIA: "Deep Learning", nivel: "avancado", titulo: "Transformers e LLMs" },
      { id: "t4", temaIA: "Ciência de Dados", nivel: "iniciante", titulo: "Dados do Zero" },
    ];
  }

  buscarTrilhasPorTema(temaIA) {
    const resultados = this._catalogo.filter((t) =>
      t.temaIA.toLowerCase().includes(temaIA.toLowerCase())
    );
    console.log(`  [Conteúdo] Busca por "${temaIA}": ${resultados.length} trilha(s) encontrada(s).`);
    return resultados;
  }

  buscarTrilhasPorNivel(nivel) {
    const resultados = this._catalogo.filter((t) => t.nivel === nivel);
    console.log(`  [Conteúdo] Trilhas de nível "${nivel}": ${resultados.length} encontrada(s).`);
    return resultados;
  }

  obterTodosOsTemas() {
    const temas = [...new Set(this._catalogo.map((t) => t.temaIA))];
    console.log(`  [Conteúdo] Temas disponíveis: ${temas.join(", ")}`);
    return temas;
  }
}

/**
 * SubsistemaProgresso
 * Rastreia e persiste o progresso de cada usuário.
 */
class SubsistemaProgresso {
  constructor() {
    this._registros = new Map(); // `${userId}-${trilhaId}` → progresso
  }

  iniciarTrilha(usuarioId, trilhaId) {
    const chave = `${usuarioId}-${trilhaId}`;
    if (!this._registros.has(chave)) {
      this._registros.set(chave, {
        percentualConcluido: 0,
        ultimoAcesso: new Date(),
        desempenho: "aguardando",
      });
      console.log(`  [Progresso] Trilha "${trilhaId}" iniciada para usuário ${usuarioId}.`);
    } else {
      console.log(`  [Progresso] Trilha "${trilhaId}" já estava em andamento.`);
    }
  }

  registrarAvanco(usuarioId, trilhaId, percentual) {
    const chave = `${usuarioId}-${trilhaId}`;
    const registro = this._registros.get(chave);
    if (!registro) throw new Error("Trilha não iniciada para este usuário.");

    registro.percentualConcluido = Math.min(100, percentual);
    registro.ultimoAcesso = new Date();
    registro.desempenho =
      percentual >= 80 ? "bom" : percentual >= 50 ? "regular" : "iniciando";

    console.log(
      `  [Progresso] Usuário ${usuarioId} – trilha "${trilhaId}": ${registro.percentualConcluido}% (${registro.desempenho})`
    );
  }

  obterRelatorio(usuarioId, trilhaId) {
    return this._registros.get(`${usuarioId}-${trilhaId}`) || null;
  }
}

/**
 * SubsistemaNotificacao
 * Envia notificações e e-mails ao usuário.
 */
class SubsistemaNotificacao {
  enviarBoasVindas(usuario) {
    console.log(`  [Notif] 📧 E-mail de boas-vindas enviado para ${usuario.email}.`);
  }

  notificarNovaTrilha(usuario, trilha) {
    console.log(
      `  [Notif] 🔔 Notificação: "${usuario.nome}", a trilha "${trilha.titulo}" foi iniciada!`
    );
  }

  notificarConclusao(usuario, trilhaId) {
    console.log(`  [Notif] 🎉 Parabéns, ${usuario.nome}! Você concluiu a trilha "${trilhaId}".`);
  }
}

// ============================================================
//  FACADE
// ============================================================

/**
 * PlataformaConhecendoIAFacade
 *
 * Interface unificada que simplifica a interação com os subsistemas
 * de autenticação, conteúdo, progresso e notificação.
 *
 * O cliente não precisa conhecer os subsistemas internos — apenas
 * chama os métodos da Facade.
 */
class PlataformaConhecendoIAFacade {
  constructor() {
    this._auth = new SubsistemaAutenticacao();
    this._conteudo = new SubsistemaConteudo();
    this._progresso = new SubsistemaProgresso();
    this._notificacao = new SubsistemaNotificacao();
  }

  /**
   * Realiza login e envia boas-vindas ao usuário.
   */
  entrar(usuario) {
    console.log(`\n► [Facade] entrar("${usuario.nome}")`);
    const token = this._auth.login(usuario);
    this._notificacao.enviarBoasVindas(usuario);
    return token;
  }

  /**
   * Retorna trilhas filtradas por tema ou nível.
   */
  descobrirConteudo({ temaIA, nivel } = {}) {
    console.log(`\n► [Facade] descobrirConteudo({ temaIA: "${temaIA}", nivel: "${nivel}" })`);
    if (temaIA) return this._conteudo.buscarTrilhasPorTema(temaIA);
    if (nivel) return this._conteudo.buscarTrilhasPorNivel(nivel);
    return this._conteudo.obterTodosOsTemas();
  }

  /**
   * Inicia uma trilha para o usuário e dispara notificação.
   */
  iniciarTrilha(usuario, trilha) {
    console.log(`\n► [Facade] iniciarTrilha("${usuario.nome}", "${trilha.titulo}")`);
    this._auth.verificarSessao(usuario.id);
    this._progresso.iniciarTrilha(usuario.id, trilha.id);
    this._notificacao.notificarNovaTrilha(usuario, trilha);
  }

  /**
   * Registra o progresso e, se concluído (100%), notifica o usuário.
   */
  registrarAvanco(usuario, trilhaId, percentual) {
    console.log(`\n► [Facade] registrarAvanco("${usuario.nome}", "${trilhaId}", ${percentual}%)`);
    this._progresso.registrarAvanco(usuario.id, trilhaId, percentual);
    if (percentual >= 100) {
      this._notificacao.notificarConclusao(usuario, trilhaId);
    }
    return this._progresso.obterRelatorio(usuario.id, trilhaId);
  }

  /**
   * Realiza logout do usuário.
   */
  sair(usuario) {
    console.log(`\n► [Facade] sair("${usuario.nome}")`);
    this._auth.logout(usuario);
  }
}

module.exports = {
  SubsistemaAutenticacao,
  SubsistemaConteudo,
  SubsistemaProgresso,
  SubsistemaNotificacao,
  PlataformaConhecendoIAFacade,
};
