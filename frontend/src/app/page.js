"use client";

import { useRouter } from 'next/navigation';
import DatabaseConnectionManager from "../lib/db/DatabaseConnectionManager";
import styles from './login.module.css';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    console.log("Iniciando processo de login...");

    const dbAuth = new DatabaseConnectionManager();
    const conexao1 = dbAuth.getConnection();

    const dbLogs = new DatabaseConnectionManager();
    const conexao2 = dbLogs.getConnection();

    console.log("ID da Conexão (Auth):", conexao1.connectionId);
    console.log("ID da Conexão (Logs):", conexao2.connectionId);
    console.log("O Singleton funcionou? São a mesma conexão?", dbAuth === dbLogs);

    alert("Olhe o console do navegador (F12) para ver o Singleton em ação!");
    
    router.push('/home');
  };

  return (
    <div className={styles.pageContainer}>
      <main className={`${styles.mainContent} ${styles.animateFadeIn}`}>
        <div className={styles.logoContainer}>
          <div className={styles.logo}></div>
        </div>
        
        <div className={styles.loginCard}>
          <div className={styles.loginHeader}>
            <h1 className={styles.loginTitle}>Login do Usuário</h1>
            <p className={styles.loginSubtitle}>
              Entre no maior fórum de Inteligência Artificial, se não tem uma conta, cadastre-se!
            </p>
          </div>

          <form>
            <div className={styles.formGroup}>
              <label htmlFor="username" className={styles.formLabel}>Digite seu Usuário</label>
              <input 
                type="text" 
                id="username" 
                className={styles.formInput} 
                placeholder="Ex: Joao" 
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.formLabel}>Digite sua senha</label>
              <input 
                type="password" 
                id="password" 
                className={styles.formInput} 
              />
            </div>

            <a href="#" className={styles.forgotPassword}>Esqueci minha senha</a>

            <div className={styles.actionButtons}>
              <button 
                type="button" 
                className={`${styles.btn} ${styles.btnPrimary}`}
                onClick={handleLogin}
              >
                Entrar
              </button>
              <button type="button" className={`${styles.btn} ${styles.btnSecondary}`}>Cadastrar</button>
            </div>
          </form>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <a href="#" className={styles.footerLink}>Privacy Policy</a>
          <a href="#" className={styles.footerLink}>Community Guidelines</a>
          <a href="#" className={styles.footerLink}>Support</a>
          <a href="#" className={styles.footerLink}>About Us</a>
        </div>
        <div className={styles.footerBrand}>ConhecendoIA</div>
        <div className={styles.footerCopy}>© 2026 ConhecendoIA Lorem Ipsum</div>
      </footer>
    </div>
  );
}