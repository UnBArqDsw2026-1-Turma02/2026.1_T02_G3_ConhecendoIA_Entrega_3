"use client";

import AppLayout from '../../components/AppLayout';
import styles from '../topico/topico.module.css';

export default function DeepLearningPage() {
  return (
    <AppLayout activePage="Discussões" activeCategory="Deep Learning">
      <div className={styles.pageContainer}>
        {/* Main Content Column */}
        <div className={styles.mainColumn}>
          {/* Main Post Card */}
          <article className={styles.postCard}>
            <div className={styles.postHeaderMeta}>
              <span className={styles.postBadge} style={{backgroundColor: '#e0e7ff', color: '#4f46e5'}}>Deep Learning</span>
              <span className={styles.postTime}>Publicado ontem</span>
            </div>
            
            <h1 className={styles.postTitle}>O avanço do Deep Learning com Transformers</h1>
            
            <div className={styles.postBody}>
              <p>Os modelos baseados na arquitetura Transformer revolucionaram completamente o processamento de linguagem natural (NLP). Desde a publicação do artigo "Attention Is All You Need", vimos uma explosão de LLMs.</p>
              <br />
              <p>O mecanismo de autoatenção permitiu treinamentos paralelizáveis enormes. Queria abrir um debate: qual vocês acham que será o próximo grande salto arquitetural pós-Transformers?</p>
            </div>

            <div className={styles.postActions}>
              <div className={styles.actionGroup}>
                <button className={`${styles.actionBtn} ${styles.actionBtnPrimary}`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                  215
                </button>
                <button className={styles.actionBtn}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                  88 Comentários
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
                    <img src="https://i.pravatar.cc/150?img=33" alt="Carlos NLP" />
                  </div>
                  <span className={styles.authorName}>Carlos NLP</span>
                </div>
                <span className={styles.commentTime}>12 horas atrás</span>
              </div>
              <div className={styles.commentBody}>
                <p>Acredito que os State Space Models (como o Mamba) têm um grande potencial para substituir ou pelo menos atuar de forma híbrida com Transformers em cenários onde o contexto longo dita um custo computacional quadrático muito alto.</p>
              </div>
              <div className={styles.commentActions}>
                <button className={styles.commentActionBtn}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                  45
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
                <img src="https://i.pravatar.cc/150?img=59" alt="Roberto AI" />
              </div>
              <div className={styles.authorInfo}>
                <h3>Roberto AI</h3>
                <span className={styles.authorTitle}>Pesquisador Principal</span>
              </div>
            </div>
            <p className={styles.authorBio}>
              Pesquisador de IAs Generativas focado em modelos Open Source.
            </p>
            <button className={styles.btnProfile}>Ver Perfil</button>
          </div>

          <div className={styles.sideCard}>
            <h2 className={styles.sideCardTitle}>TÓPICOS RELACIONADOS</h2>
            <div className={styles.relatedList}>
              <a href="#" className={styles.relatedItem}>
                <h3 className={styles.relatedTitle}>Como fazer Fine-Tuning de LLMs?</h3>
                <div className={styles.relatedMeta}>120 replies • 3 hours ago</div>
              </a>
              <a href="#" className={styles.relatedItem}>
                <h3 className={styles.relatedTitle}>O futuro da RAG (Retrieval-Augmented Generation)</h3>
                <div className={styles.relatedMeta}>85 replies • 1 day ago</div>
              </a>
            </div>
          </div>
        </aside>
      </div>
    </AppLayout>
  );
}
