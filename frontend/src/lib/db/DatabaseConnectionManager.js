class DatabaseConnectionManager {
  constructor() {
    // Verifica se a instância já existe
    if (DatabaseConnectionManager._instance) {
      console.log("[Singleton] Retornando a conexão de banco de dados JÁ EXISTENTE.");
      return DatabaseConnectionManager._instance;
    }

    // Se não existir, cria a conexão e salva na variável estática
    console.log("[Singleton] Criando uma NOVA conexão com o banco de dados...");
    this.connection = this.connectToDatabase();
    
    DatabaseConnectionManager._instance = this;
    return this;
  }

  // Método que simula a conexão real
  connectToDatabase() {
    // Aqui no futuro será colocado o código do Prisma, Mongoose, PostgreSQL, etc.
    return {
      status: "Conectado ao Banco ConhecendoIA",
      connectionId: Math.floor(Math.random() * 10000) // Gera um ID aleatório para a conexão
    };
  }

  // Método para pegar a conexão ativa
  getConnection() {
    return this.connection;
  }
}

// Exporta a classe para o resto do projeto poder usar
export default DatabaseConnectionManager;