"use client";

import AppLayout from '../../components/AppLayout';
import styles from '../topico/topico.module.css';

export default function DataSciencePage() {
  return (
    <AppLayout activePage="Discussões" activeCategory="Data Science">
      <div className={styles.pageContainer}>
        {/* Main Content Column */}
        <div className={styles.mainColumn}>
          {/* Main Post Card */}
          <article className={styles.postCard}>
            <div className={styles.postHeaderMeta}>
              <span className={styles.postBadge} style={{backgroundColor: '#e0f2fe', color: '#0369a1'}}>Data Science</span>
              <span className={styles.postTime}>Publicado há 3 dias</span>
            </div>
            
            <h1 className={styles.postTitle}>A importância da limpeza de dados na Ciência de Dados</h1>
            
            <div className={styles.postBody}>
              <p>Muitos iniciantes começam ansiosos para testar os modelos de regressão e classificação do scikit-learn, mas esquecem que 80% do trabalho de um cientista de dados real está na coleta, limpeza e validação de dados.</p>
              <br />
              <p>Gostaria de saber da comunidade: quais ferramentas e bibliotecas vocês costumam utilizar para realizar a Análise Exploratória de Dados (EDA) e tratar valores nulos ou inconsistentes nos seus projetos diários?</p>
            </div>

            <div className={styles.postActions}>
              <div className={styles.actionGroup}>
                <button className={`${styles.actionBtn} ${styles.actionBtnPrimary}`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                  340
                </button>
                <button className={styles.actionBtn}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                  112 Comentários
                </button>
              </div>
              <button className={styles.shareBtn}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                Compartilhar
              </button>
            </div>
          </article>

          {/* Comments Section */}
          <section className={styles.commentsSection}>
            <h2 className={styles.commentsTitle}>Comentários</h2>
            
            <div className={styles.commentForm}>
              <textarea 
                className={styles.commentTextarea} 
                placeholder="Escreva seu comentário..."
              ></textarea>
              <div className={styles.commentFormActions}>
                <button className={styles.btnReply}>Responder</button>
              </div>
            </div>

            <div className={styles.commentItem}>
              <div className={styles.commentHeader}>
                <div className={styles.commentAuthor}>
                  <div className={styles.avatar}>
                    <img src="https://i.pravatar.cc/150?img=47" alt="Fernanda Analyst" />
                  </div>
                  <span className={styles.authorName}>Fernanda Analyst</span>
                </div>
                <span className={styles.commentTime}>1 dia atrás</span>
              </div>
              <div className={styles.commentBody}>
                <p>Eu sempre uso a dobradinha Pandas Profiling (agora ydata-profiling) junto com o clássico seaborn para visualização das distribuições e correlações. Facilita muito a vida!</p>
              </div>
              <div className={styles.commentActions}>
                <button className={styles.commentActionBtn}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                  76
                </button>
                <button className={styles.commentActionBtn}>Responder</button>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar Column */}
        <aside className={styles.sideColumn}>
          <div className={styles.sideCard}>
            <h2 className={styles.sideCardTitle}>SOBRE O AUTOR</h2>
            <div className={styles.authorProfile}>
              <div className={styles.authorAvatar}>
                <img src="https://i.pravatar.cc/150?img=68" alt="Lucas Data" />
              </div>
              <div className={styles.authorInfo}>
                <h3>Lucas Data</h3>
                <span className={styles.authorTitle}>Cientista de Dados Sênior</span>
              </div>
            </div>
            <p className={styles.authorBio}>
              Especialista em manipulação de grandes dados e construção de pipelines analíticos no setor financeiro.
            </p>
            <button className={styles.btnProfile}>Ver Perfil</button>
          </div>

          <div className={styles.sideCard}>
            <h2 className={styles.sideCardTitle}>TÓPICOS RELACIONADOS</h2>
            <div className={styles.relatedList}>
              <a href="#" className={styles.relatedItem}>
                <h3 className={styles.relatedTitle}>Pandas vs Polars: qual o melhor em 2024?</h3>
                <div className={styles.relatedMeta}>204 replies • 2 days ago</div>
              </a>
              <a href="#" className={styles.relatedItem}>
                <h3 className={styles.relatedTitle}>Boas práticas de engenharia de features</h3>
                <div className={styles.relatedMeta}>50 replies • 5 days ago</div>
              </a>
            </div>
          </div>
        </aside>
      </div>
    </AppLayout>
  );
}
