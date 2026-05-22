// Notification.js — Products do Factory Method (ConhecendoIA)

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

    this.type = "base";
    this.icon = "📢";
    this.priority = "normal";
  }

  format() {
    throw new Error("Método abstrato format() deve ser implementado pela subclasse.");
  }

  getChannel() {
    throw new Error("Método abstrato getChannel() deve ser implementado pela subclasse.");
  }

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

module.exports = {
  Notification,
  ForumNotification,
  IDENotification,
  AchievementNotification,
  SystemNotification,
};
