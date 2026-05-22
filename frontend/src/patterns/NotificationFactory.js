/**
 * =========================================================
 * Factory Method — GoF Criacional
 * Projeto: ConhecendoIA (G3 - Arquitetura e Desenho de Software)
 *
 * Domínio: Sistema de Notificações da plataforma ConhecendoIA.
 * Cada módulo da plataforma (Fórum, IDE Python, Gamificação, Sistema)
 * gera notificações de tipos distintos, com formatação, ícone,
 * prioridade e canal de entrega específicos.
 *
 * O Factory Method delega a criação de cada tipo concreto de
 * Notification ao seu respectivo Creator, desacoplando o código
 * cliente dos tipos concretos.
 *
 * Localização: frontend/src/patterns/NotificationFactory.js
 * =========================================================
 */

// ─────────────────────────────────────────────────────────
// 1. PRODUCT — Classe abstrata base: Notification
// ─────────────────────────────────────────────────────────

/**
 * Classe abstrata que define a interface de todas as notificações.
 * Cada subclasse concreta implementa format() e getChannel().
 */
class Notification {
  constructor({ message, userId, data = {} }) {
    if (new.target === Notification) {
      throw new Error(
        "Notification é uma classe abstrata e não pode ser instanciada diretamente."
      );
    }

    this.message = message;
    this.userId = userId;
    this.data = data;
    this.timestamp = new Date().toISOString();

    // Propriedades abstratas — devem ser sobrescritas pelas subclasses
    this.type = "base";
    this.icon = "📢";
    this.priority = "normal"; // baixa | normal | alta | critica
  }

  /**
   * Formata a notificação para exibição.
   * @returns {string} Texto formatado da notificação.
   */
  format() {
    throw new Error("Método abstrato format() deve ser implementado pela subclasse.");
  }

  /**
   * Retorna o canal de entrega da notificação.
   * @returns {string} Canal (in-app, email, push, etc.)
   */
  getChannel() {
    throw new Error("Método abstrato getChannel() deve ser implementado pela subclasse.");
  }

  /**
   * Serializa a notificação para persistência ou transmissão.
   * @returns {Object}
   */
  toJSON() {
    return {
      type: this.type,
      icon: this.icon,
      priority: this.priority,
      message: this.message,
      userId: this.userId,
      timestamp: this.timestamp,
      channel: this.getChannel(),
      formatted: this.format(),
      data: this.data,
    };
  }
}

// ─────────────────────────────────────────────────────────
// 2. CONCRETE PRODUCTS — Tipos concretos de notificação
// ─────────────────────────────────────────────────────────


class ForumNotification extends Notification {
  constructor({ message, userId, data = {} }) {
    super({ message, userId, data });
    this.type = "forum";
    this.icon = "💬";
    this.priority = "normal";
    this.topicoId = data.topicoId || null;
    this.autorResposta = data.autorResposta || "Anônimo";
  }

  format() {
    const topico = this.topicoId ? ` no tópico #${this.topicoId}` : "";
    return `${this.icon} [Fórum] ${this.autorResposta} respondeu${topico}: "${this.message}"`;
  }

  getChannel() {
    return "in-app";
  }
}


class IDENotification extends Notification {
  constructor({ message, userId, data = {} }) {
    super({ message, userId, data });
    this.type = "ide";
    this.icon = "🐍";
    this.priority = "baixa";
    this.linguagem = data.linguagem || "Python";
    this.statusExecucao = data.statusExecucao || "sucesso";
  }

  format() {
    const status = this.statusExecucao === "sucesso" ? "✅" : "❌";
    return `${this.icon} [IDE ${this.linguagem}] Execução ${status}: ${this.message}`;
  }

  getChannel() {
    return "in-app";
  }
}

class AchievementNotification extends Notification {
  constructor({ message, userId, data = {} }) {
    super({ message, userId, data });
    this.type = "achievement";
    this.icon = "🏆";
    this.priority = "alta";
    this.badge = data.badge || null;
    this.xp = data.xp || 0;
  }

  format() {
    const badgeText = this.badge ? ` Badge: "${this.badge}".` : "";
    const xpText = this.xp > 0 ? ` +${this.xp} XP!` : "";
    return `${this.icon} [Conquista] ${this.message}${badgeText}${xpText}`;
  }

  getChannel() {
    return "in-app+push";
  }
}


class SystemNotification extends Notification {
  constructor({ message, userId, data = {} }) {
    super({ message, userId, data });
    this.type = "system";
    this.icon = "⚠️";
    this.priority = "critica";
    this.severidade = data.severidade || "info";
  }

  format() {
    const tag = this.severidade.toUpperCase();
    return `${this.icon} [Sistema - ${tag}] ${this.message}`;
  }

  getChannel() {
    return "in-app+email";
  }
}

// ─────────────────────────────────────────────────────────
// 3. CREATOR — Classe abstrata com o Factory Method
// ─────────────────────────────────────────────────────────


class NotificationCreator {
  constructor() {
    if (new.target === NotificationCreator) {
      throw new Error(
        "NotificationCreator é uma classe abstrata e não pode ser instanciada diretamente."
      );
    }
  }

  /**
   * Factory Method — deve ser implementado pelas subclasses.
   * @param {Object} data — Dados para criação da notificação.
   * @returns {Notification}
   */
  createNotification(data) {
    throw new Error(
      "Factory Method createNotification() deve ser implementado pela subclasse."
    );
  }

  /**
   * Operação principal que utiliza o Factory Method.
   * Cria a notificação e realiza o envio (simulado).
   * @param {string} userId — ID do usuário destinatário.
   * @param {Object} data — Dados da notificação (message, etc.)
   * @returns {Object} — Resultado do envio.
   */
  notify(userId, data) {
    // Factory Method — a subclasse decide qual Notification criar
    // Passa todas as propriedades extras dentro de 'data' para que
    // os Concrete Products acessem campos específicos (ex.: topicoId, badge)
    const { message, ...extras } = data;
    const notification = this.createNotification({ message, userId, data: extras });

    // Lógica de envio comum a todos os tipos
    const payload = notification.toJSON();

    console.log(`\n📤 Enviando notificação via [${payload.channel}]...`);
    console.log(`   Para: Usuário ${userId}`);
    console.log(`   Tipo: ${payload.type} | Prioridade: ${payload.priority}`);
    console.log(`   ${payload.formatted}`);
    console.log(`   Timestamp: ${payload.timestamp}`);

    return {
      success: true,
      notification: payload,
    };
  }
}

// ─────────────────────────────────────────────────────────
// 4. CONCRETE CREATORS — Fábricas concretas
// ─────────────────────────────────────────────────────────


class ForumNotificationCreator extends NotificationCreator {
  createNotification(data) {
    return new ForumNotification(data);
  }
}


class IDENotificationCreator extends NotificationCreator {
  createNotification(data) {
    return new IDENotification(data);
  }
}


class AchievementNotificationCreator extends NotificationCreator {
  createNotification(data) {
    return new AchievementNotification(data);
  }
}


class SystemNotificationCreator extends NotificationCreator {
  createNotification(data) {
    return new SystemNotification(data);
  }
}

// ─────────────────────────────────────────────────────────
// 5. NOTIFICATION FACTORY — Fachada utilitária
// ─────────────────────────────────────────────────────────


class NotificationFactory {
  static _creators = {
    forum: new ForumNotificationCreator(),
    ide: new IDENotificationCreator(),
    achievement: new AchievementNotificationCreator(),
    system: new SystemNotificationCreator(),
  };

  /**
   * Cria uma notificação pelo tipo, sem enviar.
   * @param {string} type — Tipo da notificação (forum, ide, achievement, system).
   * @param {Object} data — Dados da notificação.
   * @returns {Notification}
   */
  static create(type, data) {
    const creator = NotificationFactory._creators[type];
    if (!creator) {
      throw new Error(
        `Tipo de notificação desconhecido: "${type}". ` +
        `Tipos válidos: ${Object.keys(NotificationFactory._creators).join(", ")}`
      );
    }
    return creator.createNotification(data);
  }

  /**
   * Cria e "envia" uma notificação ao usuário.
   * @param {string} type — Tipo da notificação.
   * @param {string} userId — ID do destinatário.
   * @param {Object} data — Dados da notificação.
   * @returns {Object} — Resultado do envio.
   */
  static send(type, userId, data) {
    const creator = NotificationFactory._creators[type];
    if (!creator) {
      throw new Error(
        `Tipo de notificação desconhecido: "${type}". ` +
        `Tipos válidos: ${Object.keys(NotificationFactory._creators).join(", ")}`
      );
    }
    return creator.notify(userId, data);
  }

  /**
   * Registra um novo tipo de notificação (extensibilidade).
   * @param {string} type — Nome do novo tipo.
   * @param {NotificationCreator} creator — Instância do Creator.
   */
  static registerType(type, creator) {
    if (!(creator instanceof NotificationCreator)) {
      throw new Error("O creator deve ser uma instância de NotificationCreator.");
    }
    NotificationFactory._creators[type] = creator;
    console.log(`✅ Tipo de notificação "${type}" registrado com sucesso.`);
  }

  /**
   * Lista todos os tipos de notificação registrados.
   * @returns {string[]}
   */
  static getRegisteredTypes() {
    return Object.keys(NotificationFactory._creators);
  }
}

// ─────────────────────────────────────────────────────────
// 6. DEMONSTRAÇÃO — Exemplo de uso do Factory Method
// ─────────────────────────────────────────────────────────

function demonstrarFactoryMethod() {
  console.log("═══════════════════════════════════════════════════");
  console.log("  🏭 Factory Method — Sistema de Notificações");
  console.log("     Projeto ConhecendoIA");
  console.log("═══════════════════════════════════════════════════");

  // --- 1. Uso direto dos Creators (padrão clássico) ---
  console.log("\n── 1. Uso direto dos Creators ──────────────────\n");

  const forumCreator = new ForumNotificationCreator();
  forumCreator.notify("user-42", {
    message: "Sua pergunta sobre Redes Neurais recebeu uma resposta!",
    topicoId: 128,
    autorResposta: "Maria Silva",
  });

  const ideCreator = new IDENotificationCreator();
  ideCreator.notify("user-42", {
    message: "Código executado em 0.3s — sem erros.",
    linguagem: "Python",
    statusExecucao: "sucesso",
  });

  const achievementCreator = new AchievementNotificationCreator();
  achievementCreator.notify("user-42", {
    message: "Você completou o quiz de Machine Learning!",
    badge: "ML Explorer",
    xp: 50,
  });

  const systemCreator = new SystemNotificationCreator();
  systemCreator.notify("user-42", {
    message: "Manutenção programada para 22/05/2026, 03:00 UTC.",
    severidade: "aviso",
  });

  // --- 2. Uso via NotificationFactory (fachada) ---
  console.log("\n── 2. Uso via NotificationFactory ──────────────\n");

  NotificationFactory.send("forum", "user-99", {
    message: "Novo comentário no seu tópico sobre Deep Learning.",
    topicoId: 256,
    autorResposta: "Carlos Mendes",
  });

  NotificationFactory.send("achievement", "user-99", {
    message: "Ranking atualizado — você subiu para o Top 10!",
    badge: "Top Contributor",
    xp: 100,
  });

  // --- 3. Criação sem envio ---
  console.log("\n── 3. Criação sem envio (apenas objeto) ────────\n");

  const notif = NotificationFactory.create("ide", {
    message: "Timeout: execução excedeu 30s.",
    userId: "user-77",
    linguagem: "Python",
    statusExecucao: "erro",
  });

  console.log("Notificação criada (JSON):");
  console.log(JSON.stringify(notif.toJSON(), null, 2));

  // --- 4. Tipos registrados ---
  console.log("\n── 4. Tipos registrados ────────────────────────\n");
  console.log("Tipos disponíveis:", NotificationFactory.getRegisteredTypes());

  // --- 5. Erro ao usar tipo desconhecido ---
  console.log("\n── 5. Tratamento de erro ───────────────────────\n");
  try {
    NotificationFactory.send("sms", "user-1", { message: "teste" });
  } catch (err) {
    console.log(`❌ Erro esperado: ${err.message}`);
  }

  // --- 6. Erro ao instanciar classe abstrata ---
  console.log("\n── 6. Proteção de classes abstratas ────────────\n");
  try {
    new Notification({ message: "teste", userId: "1" });
  } catch (err) {
    console.log(`❌ Erro esperado: ${err.message}`);
  }
  try {
    new NotificationCreator();
  } catch (err) {
    console.log(`❌ Erro esperado: ${err.message}`);
  }

  console.log("\n═══════════════════════════════════════════════════");
  console.log("  ✅ Demonstração concluída com sucesso!");
  console.log("═══════════════════════════════════════════════════\n");
}

// Executar demonstração se rodado diretamente
if (typeof require !== "undefined" && require.main === module) {
  demonstrarFactoryMethod();
}

// Exportações
module.exports = {
  // Products
  Notification,
  ForumNotification,
  IDENotification,
  AchievementNotification,
  SystemNotification,
  // Creators
  NotificationCreator,
  ForumNotificationCreator,
  IDENotificationCreator,
  AchievementNotificationCreator,
  SystemNotificationCreator,
  // Factory (fachada)
  NotificationFactory,
  // Demo
  demonstrarFactoryMethod,
};
