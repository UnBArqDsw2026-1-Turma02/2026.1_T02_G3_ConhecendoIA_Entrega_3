export default function LoginPage() {
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
              <button type="button" className="btn btn-primary">Entrar</button>
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
