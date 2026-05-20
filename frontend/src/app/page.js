"use client"; // Adicionamos isso porque vamos ter interação (clicar no botão de entrar)

// Importamos o nosso padrão Singleton para gerenciar conexões com o banco de dados
import DatabaseConnectionManager from "../lib/db/DatabaseConnectionManager";

export default function LoginPage() {

  // Função que será executada quando o usuário clicar em "Entrar"
  const handleLogin = () => {
    console.log("Iniciando processo de login...");

    // Simulando o Módulo de Autenticação pedindo a conexão com o banco
    const dbAuth = new DatabaseConnectionManager();
    const conexao1 = dbAuth.getConnection();

    // Simulando outro módulo (ex: Módulo de Logs) pedindo a conexão logo em seguida
    const dbLogs = new DatabaseConnectionManager();
    const conexao2 = dbLogs.getConnection();

    // Teste no Console do Navegador
    console.log("ID da Conexão (Auth):", conexao1.connectionId);
    console.log("ID da Conexão (Logs):", conexao2.connectionId);
    console.log("O Singleton funcionou? São a mesma conexão?", dbAuth === dbLogs);
    
    alert("Olhe o console do navegador (F12) para ver o Singleton em ação!");
  };

  return (
    <div className="page-container">
      <main className="main-content animate-fade-in">
        <div className="logo-container">
          <div className="logo"></div>
        </div>
        
        <div className="login-card">
          <div className="login-header">
            <h1 className="login-title">Login do Usuário</h1>
            <p className="login-subtitle">
              Entre no maior fórum de Inteligência Artificial, se não tem uma conta, cadastre-se!
            </p>
          </div>

          <form>
            <div className="form-group">
              <label htmlFor="username" className="form-label">Digite seu Usuário</label>
              <input 
                type="text" 
                id="username" 
                className="form-input" 
                placeholder="Ex: Joao" 
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Digite sua senha</label>
              <input 
                type="password" 
                id="password" 
                className="form-input" 
              />
            </div>

            <a href="#" className="forgot-password">Esqueci minha senha</a>

            <div className="action-buttons">
              {/* Adicionamos o evento onClick aqui! */}
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={handleLogin}
              >
                Entrar
              </button>
              <button type="button" className="btn btn-secondary">Cadastrar</button>
            </div>
          </form>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-links">
          <a href="#" className="footer-link">Privacy Policy</a>
          <a href="#" className="footer-link">Community Guidelines</a>
          <a href="#" className="footer-link">Support</a>
          <a href="#" className="footer-link">About Us</a>
        </div>
        <div className="footer-brand">ConhecendoIA</div>
        <div className="footer-copy">© 2026 ConhecendoIA Lorem Ipsum</div>
      </footer>
    </div>
  );
}