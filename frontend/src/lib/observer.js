// ============================================================
//  GOF COMPORTAMENTAL: OBSERVER
//  Contexto: ConhecendoIA – Plataforma de divulgação sobre IA
// ============================================================
//
//  Problema: Quando um Usuário avança em um Conteúdo da plataforma,
//  várias partes do sistema precisam reagir: o Progresso deve ser
//  atualizado, o sistema de gamificação deve checar conquistas,
//  o mecanismo de recomendação deve sugerir novos conteúdos e o
//  log de atividades deve registrar o evento. Acoplar todas essas
//  responsabilidades na classe Progresso viola o SRP e cria
//  dependências rígidas.
//
//  Solução: O Observer define uma relação 1-para-N: o "sujeito"
//  (Progresso) emite eventos e os "observadores" registrados
//  reagem de forma independente.
// ============================================================

// ============================================================
//  INTERFACE DO OBSERVER (contrato)
// ============================================================

/**
 * ObservadorProgresso
 *
 * Contrato que todo observador do sistema de progresso deve seguir.
 * @interface
 */
class ObservadorProgresso {
  /**
   * @param {EventoProgresso} evento - Dados do evento emitido
   */
  atualizar(evento) {
    throw new Error(`${this.constructor.name} deve implementar atualizar(evento).`);
  }
}

// ============================================================
//  SUJEITO (Subject / Observable)
// ============================================================

/**
 * EventoProgresso
 *
 * DTO que encapsula os dados de um evento emitido pelo sujeito.
 */
class EventoProgresso {
  constructor({ tipo, usuario, trilhaId, percentualConcluido, conteudoId }) {
    this.tipo = tipo; // 'AVANCO' | 'CONCLUSAO_CONTEUDO' | 'CONCLUSAO_TRILHA'
    this.usuario = usuario;
    this.trilhaId = trilhaId;
    this.percentualConcluido = percentualConcluido;
    this.conteudoId = conteudoId || null;
    this.timestamp = new Date();
  }
}

/**
 * Progresso (Sujeito / Observable)
 *
 * Mantém o estado de progresso de um usuário em uma trilha e
 * notifica todos os observadores registrados quando há mudança.
 */
class Progresso {
  constructor(usuarioId, trilhaId) {
    this.usuarioId = usuarioId;
    this.trilhaId = trilhaId;
    this.percentualConcluido = 0;
    this.ultimoAcesso = new Date();
    this.desempenho = "iniciando";

    /** @type {ObservadorProgresso[]} */
    this._observadores = [];
  }

  // ── Gerenciamento de observadores ────────────────────────

  /**
   * Registra um observador para receber notificações.
   * @param {ObservadorProgresso} observador
   */
  registrarObservador(observador) {
    if (!(observador instanceof ObservadorProgresso)) {
      throw new TypeError("Esperado uma instância de ObservadorProgresso.");
    }
    this._observadores.push(observador);
    console.log(`  [Progresso] Observador "${observador.constructor.name}" registrado.`);
  }

  /**
   * Remove um observador previamente registrado.
   * @param {ObservadorProgresso} observador
   */
  removerObservador(observador) {
    this._observadores = this._observadores.filter((o) => o !== observador);
    console.log(`  [Progresso] Observador "${observador.constructor.name}" removido.`);
  }

  /**
   * Emite um evento para todos os observadores registrados.
   * @param {EventoProgresso} evento
   */
  _notificarObservadores(evento) {
    console.log(
      `\n  [Progresso] 📡 Notificando ${this._observadores.length} observador(es) – evento: "${evento.tipo}"`
    );
    this._observadores.forEach((obs) => obs.atualizar(evento));
  }

  // ── Lógica de negócio ─────────────────────────────────────

  /**
   * Registra o avanço do usuário e notifica os observadores.
   * @param {number} valor - Percentual absoluto de progresso (0-100)
   * @param {object} usuario - Dados do usuário
   * @param {string} [conteudoId] - ID do conteúdo concluído (opcional)
   */
  registrarAvanco(valor, usuario, conteudoId = null) {
    const percentualAnterior = this.percentualConcluido;
    this.percentualConcluido = Math.min(100, Math.max(0, valor));
    this.ultimoAcesso = new Date();
    this.desempenho =
      this.percentualConcluido >= 80
        ? "excelente"
        : this.percentualConcluido >= 50
        ? "bom"
        : "iniciando";

    console.log(
      `\n[Progresso] Usuário "${usuario.nome}" avançou de ${percentualAnterior}% → ${this.percentualConcluido}% na trilha "${this.trilhaId}"`
    );

    let tipoEvento = "AVANCO";
    if (conteudoId) tipoEvento = "CONCLUSAO_CONTEUDO";
    if (this.percentualConcluido >= 100) tipoEvento = "CONCLUSAO_TRILHA";

    const evento = new EventoProgresso({
      tipo: tipoEvento,
      usuario,
      trilhaId: this.trilhaId,
      percentualConcluido: this.percentualConcluido,
      conteudoId,
    });

    this._notificarObservadores(evento);
  }

  obterRelatorio() {
    return {
      usuarioId: this.usuarioId,
      trilhaId: this.trilhaId,
      percentualConcluido: this.percentualConcluido,
      ultimoAcesso: this.ultimoAcesso,
      desempenho: this.desempenho,
    };
  }
}

// ============================================================
//  OBSERVADORES CONCRETOS
// ============================================================

/**
 * ObservadorGamificacao
 * Reage ao progresso verificando badges e marcos de aprendizado.
 */
class ObservadorGamificacao extends ObservadorProgresso {
  constructor() {
    super();
    this._conquistas = [];
  }

  atualizar(evento) {
    const { tipo, usuario, percentualConcluido } = evento;

    if (tipo === "CONCLUSAO_CONTEUDO") {
      this._conquistas.push({ badge: "📖 Leitor Assíduo", usuario: usuario.nome });
      console.log(`  [Gamificação] 🏅 Badge desbloqueado para ${usuario.nome}: "Leitor Assíduo"`);
    }

    if (percentualConcluido >= 50 && tipo === "AVANCO") {
      const badge = "🔥 Meio Caminho";
      if (!this._conquistas.find((c) => c.badge === badge && c.usuario === usuario.nome)) {
        this._conquistas.push({ badge, usuario: usuario.nome });
        console.log(`  [Gamificação] 🏅 Badge desbloqueado para ${usuario.nome}: "${badge}"`);
      }
    }

    if (tipo === "CONCLUSAO_TRILHA") {
      this._conquistas.push({ badge: "🎓 Trilheiro Concluinte", usuario: usuario.nome });
      console.log(
        `  [Gamificação] 🏅 Badge desbloqueado para ${usuario.nome}: "Trilheiro Concluinte"`
      );
    }
  }

  obterConquistas() {
    return this._conquistas;
  }
}

/**
 * ObservadorRecomendacao
 * Sugere novos conteúdos ou trilhas relacionadas ao progresso.
 */
class ObservadorRecomendacao extends ObservadorProgresso {
  constructor() {
    super();
    this._recomendacoes = {
      "Redes Neurais": ["Deep Learning", "Aprendizado de Máquina"],
      "Aprendizado de Máquina": ["Ciência de Dados", "Deep Learning"],
      "Deep Learning": ["NLP", "Visão Computacional"],
      "Ciência de Dados": ["Estatística Avançada", "Aprendizado de Máquina"],
    };
  }

  atualizar(evento) {
    const { tipo, usuario, trilhaId } = evento;

    if (tipo === "CONCLUSAO_TRILHA") {
      const sugestoes = this._recomendacoes[trilhaId] || ["Explorar outros temas de IA"];
      console.log(
        `  [Recomendação] 💡 Para ${usuario.nome}, após concluir "${trilhaId}", sugerimos:`
      );
      sugestoes.forEach((s) => console.log(`     → ${s}`));
    } else if (tipo === "AVANCO" && evento.percentualConcluido >= 70) {
      console.log(
        `  [Recomendação] 📚 ${usuario.nome} está quase lá! Que tal antecipar o próximo módulo?`
      );
    }
  }
}

/**
 * ObservadorLogAtividade
 * Persiste histórico de ações para auditoria e análise de engajamento.
 */
class ObservadorLogAtividade extends ObservadorProgresso {
  constructor() {
    super();
    this._log = [];
  }

  atualizar(evento) {
    const entrada = {
      timestamp: evento.timestamp.toISOString(),
      tipo: evento.tipo,
      usuario: evento.usuario.nome,
      trilhaId: evento.trilhaId,
      percentual: evento.percentualConcluido,
    };
    this._log.push(entrada);
    console.log(
      `  [Log] 📝 Registrado: [${entrada.timestamp}] ${entrada.tipo} – ${entrada.usuario} – ${entrada.percentual}%`
    );
  }

  obterHistorico() {
    return this._log;
  }
}

/**
 * ObservadorNotificacaoEmail
 * Envia e-mails em marcos importantes do progresso.
 */
class ObservadorNotificacaoEmail extends ObservadorProgresso {
  atualizar(evento) {
    const { tipo, usuario, trilhaId } = evento;

    if (tipo === "CONCLUSAO_TRILHA") {
      console.log(
        `  [E-mail] 📧 Enviado para ${usuario.email}: "Parabéns! Você concluiu a trilha '${trilhaId}'!"`
      );
    }

    if (tipo === "CONCLUSAO_CONTEUDO") {
      console.log(
        `  [E-mail] 📧 Enviado para ${usuario.email}: "Você concluiu um novo conteúdo em '${trilhaId}'!"`
      );
    }
  }
}

module.exports = {
  ObservadorProgresso,
  EventoProgresso,
  Progresso,
  ObservadorGamificacao,
  ObservadorRecomendacao,
  ObservadorLogAtividade,
  ObservadorNotificacaoEmail,
};
