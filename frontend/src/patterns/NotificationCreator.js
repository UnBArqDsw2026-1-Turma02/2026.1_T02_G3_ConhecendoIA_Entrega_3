

const {
  ForumNotification,
  IDENotification,
  AchievementNotification,
  SystemNotification,
} = require("./Notification");

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

    const { message, ...extras } = data;
    const notification = this.createNotification({ message, userId, data: extras });


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


module.exports = {
  NotificationCreator,
  ForumNotificationCreator,
  IDENotificationCreator,
  AchievementNotificationCreator,
  SystemNotificationCreator,
};
