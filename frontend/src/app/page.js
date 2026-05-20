"use client";

import { useState } from "react";
// Importação do Singleton
import DatabaseConnectionManager from "../lib/db/DatabaseConnectionManager";
// Importações do Decorator
import { 
  PythonCodeExecutor, 
  SecuritySandboxDecorator, 
  MetricsDecorator 
} from "../services/ide/Executors";

export default function LoginPage() {
  // Estado para mostrar a caixinha de aviso na tela
  const [mensagemStatus, setMensagemStatus] = useState("");

  // FUNÇÃO 1: TESTE DO SINGLETON (GoF Criacional)
  const handleLogin = () => {
    console.log("Iniciando processo de login...");

    const dbAuth = new DatabaseConnectionManager();
    const conexao1 = dbAuth.getConnection();

    const dbLogs = new DatabaseConnectionManager();
    const conexao2 = dbLogs.getConnection();

    const isSingletonWork = dbAuth === dbLogs;

    console.log("ID da Conexão (Auth):", conexao1.connectionId);
    console.log("ID da Conexão (Logs):", conexao2.connectionId);
    
    setMensagemStatus(
      isSingletonWork 
        ? `[Singleton] Sucesso! Mesma conexão usada. ID: ${conexao1.connectionId}` 
        : "[Singleton] Erro: Conexões diferentes geradas."
    );
  };

  // FUNÇÃO 2: TESTE DO DECORATOR (GoF Estrutural)
  
  const handleRunIDE = async (isMalicious) => {
    setMensagemStatus("Carregando IDE..."); // Aviso de carregamento

    const code = isMalicious 
      ? "import os \nos.system('rm -rf /')" 
      : "import numpy as np \nprint('Treinando Rede Neural...')";

    // 1. Base
    let executor = new PythonCodeExecutor();
    // 2. + Segurança
    executor = new SecuritySandboxDecorator(executor);
    // 3. + Métricas
    executor = new MetricsDecorator(executor);

    // 4. Executa a cadeia de Decorators
    const result = await executor.execute(code);
    console.log("Resultado IDE:", result);
    
    if (result.error) {
      setMensagemStatus(`🔒 [Decorator] Bloqueado pelo Sandbox: ${result.error}`);
    } else {
      setMensagemStatus(`✅ [Decorator] Sucesso: ${result.output} (Tempo: ${result.executionTimeMs}ms)`);
    }
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

            {/* ÁREA DOS BOTÕES */}
            <div className="action-buttons" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              
              {/* Linha 1: Login / Cadastro */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={handleLogin}
                  style={{ flex: 1 }}
                >
                  Entrar (Singleton)
                </button>
                <button type="button" className="btn btn-secondary" style={{ flex: 1 }}>
                  Cadastrar
                </button>
              </div>

              {/* Linha 2: Testes da IDE (Decorator) */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => handleRunIDE(false)}
                  style={{ flex: 1, fontSize: '0.85rem' }}
                >
                  Rodar IDE (Seguro)
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => handleRunIDE(true)}
                  style={{ flex: 1, fontSize: '0.85rem', background: '#d32f2f', color: 'white', borderColor: '#d32f2f' }}
                >
                  Rodar IDE (Vírus)
                </button>
              </div>

            </div>
            
            {/* CAIXA DE FEEDBACK VISUAL */}
            {mensagemStatus && (
              <div style={{ marginTop: '20px', padding: '12px', background: '#e0f7fa', color: '#006064', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold', fontSize: '0.9rem' }}>
                {mensagemStatus}
              </div>
            )}

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