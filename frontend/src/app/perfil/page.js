"use client";

import AppLayout from '../../components/AppLayout';
import styles from './perfil.module.css';

export default function PerfilPage() {
  return (
    <AppLayout activePage="Perfil">
      <div className={styles.pageContainer}>
        
        {/* Header Section */}
        <section className={styles.headerSection}>
          <div className={styles.headerText}>
            <h1 className={styles.pageTitle}>Perfil do Usuário</h1>
            <p className={styles.pageSubtitle}>
              Bem-vindo(a) de volta ao seu centro de informações selecionadas. Acompanhe suas contribuições, revise discussões recentes e gerencie seus interesses acadêmicos em um só lugar.
            </p>
          </div>
          
          <div className={styles.profileCard}>
            <div className={styles.avatarWrapper}>
              <img src="https://i.pravatar.cc/150?img=11" alt="John Doe" className={styles.avatar} />
              <div className={styles.levelBadge}>Level 42</div>
            </div>
            <h2 className={styles.profileName}>John Doe</h2>
            <span className={styles.profileRole}>Community Architect</span>
          </div>
        </section>

        {/* Stats Section */}
        <section className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            </div>
            <div>
              <div className={styles.statLabel}>Tópicos Criados</div>
              <div className={styles.statValue}>2</div>
            </div>
          </div>
          
          <div className={styles.statCard}>
            <div className={styles.statIconBlue}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </div>
            <div>
              <div className={styles.statLabel}>Respostas Aceitas</div>
              <div className={styles.statValue}>128</div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
            </div>
            <div>
              <div className={styles.statLabel}>Total de Likes</div>
              <div className={styles.statValue}>2.4k</div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className={styles.contentSection}>
          
          {/* Main Column */}
          <div className={styles.mainColumn}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Suas últimas publicações</h2>
              <a href="#" className={styles.linkVerTodos}>Ver Todos</a>
            </div>

            <div className={styles.postCard}>
              <div className={styles.postHeader}>
                <span className={styles.postBadge}>Neural Networks</span>
                <span className={styles.postTime}>2 horas atrás</span>
              </div>
              <h3 className={styles.postTitle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit?</h3>
              <p className={styles.postExcerpt}>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>
              <div className={styles.postFooter}>
                <div className={styles.postFooterItem}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                  24 Comentários
                </div>
                <div className={styles.postFooterItem}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                  152 Likes
                </div>
              </div>
            </div>

            <div className={styles.postCard}>
              <div className={styles.postHeader}>
                <span className={`${styles.postBadge} ${styles.purple}`}>Deep Learning</span>
                <span className={styles.postTime}>Ontem</span>
              </div>
              <h3 className={styles.postTitle}>Ut labore et dolore magna aliqua enim ad minim veniam?</h3>
              <p className={styles.postExcerpt}>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>
              <div className={styles.postFooter}>
                <div className={styles.postFooterItem}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                  12 Comentários
                </div>
                <div className={styles.postFooterItem}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                  89 Likes
                </div>
              </div>
            </div>

          </div>

          {/* Side Column */}
          <div className={styles.sideColumn}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Tópicos que você segue</h2>
            </div>
            
            <div className={styles.followedList}>
              <a href="#" className={styles.followedItem}>
                <div className={styles.followedTitleWrapper}>
                  <span className={styles.dot} style={{ backgroundColor: '#8b5cf6' }}></span>
                  <span className={styles.followedTitle}>Machine Learning Ethics</span>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.arrowIcon}><polyline points="9 18 15 12 9 6"></polyline></svg>
              </a>

              <a href="#" className={styles.followedItem}>
                <div className={styles.followedTitleWrapper}>
                  <span className={styles.dot} style={{ backgroundColor: '#0f766e' }}></span>
                  <span className={styles.followedTitle}>NLP Advancements</span>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.arrowIcon}><polyline points="9 18 15 12 9 6"></polyline></svg>
              </a>

              <a href="#" className={styles.followedItem}>
                <div className={styles.followedTitleWrapper}>
                  <span className={styles.dot} style={{ backgroundColor: '#3b82f6' }}></span>
                  <span className={styles.followedTitle}>Data Visualization</span>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.arrowIcon}><polyline points="9 18 15 12 9 6"></polyline></svg>
              </a>

              <a href="#" className={styles.followedItem}>
                <div className={styles.followedTitleWrapper}>
                  <span className={styles.dot} style={{ backgroundColor: '#ef4444' }}></span>
                  <span className={styles.followedTitle}>AI Governance</span>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.arrowIcon}><polyline points="9 18 15 12 9 6"></polyline></svg>
              </a>
            </div>
          </div>

        </section>

      </div>
    </AppLayout>
  );
}
