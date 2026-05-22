"use client";

import AppLayout from '../../components/AppLayout';
import styles from './topico.module.css';

export default function TopicoPage() {
  return (
    <AppLayout activePage="Discussões" activeCategory="Machine Learning">
      <div className={styles.pageContainer}>
        {/* Main Content Column */}
        <div className={styles.mainColumn}>
          {/* Main Post Card */}
          <article className={styles.postCard}>
            <div className={styles.postHeaderMeta}>
              <span className={styles.postBadge}>Machine Learning</span>
              <span className={styles.postTime}>Publicado 2 horas atrás</span>
            </div>
            
            <h1 className={styles.postTitle}>Como funciona o Machine Learning?</h1>
            
            <div className={styles.postBody}>
              <p>Machine Learning (aprendizado de máquina) funciona treinando algoritmos com grandes volumes de dados para identificar padrões, permitindo que computadores façam previsões ou decisões automaticamente, sem programação explícita para cada tarefa.</p>
              <br />
              <p>O processo envolve treinar um modelo com dados históricos, ajustá-lo para minimizar erros e testá-lo para garantir precisão. [1, 2, 3, 4].</p>
            </div>

            <div className={styles.postActions}>
              <div className={styles.actionGroup}>
                <button className={`${styles.actionBtn} ${styles.actionBtnPrimary}`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                  124
                </button>
                <button className={styles.actionBtn}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                  42 Comentários
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
            
            {/* Comment Form */}
            <div className={styles.commentForm}>
              <textarea 
                className={styles.commentTextarea} 
                placeholder="Escreva seu comentário..."
              ></textarea>
              <div className={styles.commentFormActions}>
                <button className={styles.btnReply}>Responder</button>
              </div>
            </div>

            {/* Comment Item 1 */}
            <div className={styles.commentItem}>
              <div className={styles.commentHeader}>
                <div className={styles.commentAuthor}>
                  <div className={styles.avatar}>
                    <img src="https://i.pravatar.cc/150?img=11" alt="Lorem User" />
                  </div>
                  <span className={styles.authorName}>Lorem User</span>
                </div>
                <span className={styles.commentTime}>1 hora atrás</span>
              </div>
              <div className={styles.commentBody}>
                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
              </div>
              <div className={styles.commentActions}>
                <button className={styles.commentActionBtn}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                  12
                </button>
                <button className={styles.commentActionBtn}>Responder</button>
              </div>
            </div>

            {/* Nested Comment */}
            <div className={`${styles.commentItem} ${styles.commentNested}`}>
              <div className={styles.commentHeader}>
                <div className={styles.commentAuthor}>
                  <div className={styles.avatar}>
                    <img src="https://i.pravatar.cc/150?img=3" alt="Ipsum Expert" />
                  </div>
                  <span className={styles.authorName}>Ipsum Expert</span>
                </div>
                <span className={styles.commentTime}>45 min atrás</span>
              </div>
              <div className={styles.commentBody}>
                <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
              </div>
              <div className={styles.commentActions}>
                <button className={styles.commentActionBtn}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                  5
                </button>
                <button className={styles.commentActionBtn}>Responder</button>
              </div>
            </div>

          </section>
        </div>

        {/* Sidebar Column */}
        <aside className={styles.sideColumn}>
          {/* Author Card */}
          <div className={styles.sideCard}>
            <h2 className={styles.sideCardTitle}>SOBRE O AUTOR</h2>
            <div className={styles.authorProfile}>
              <div className={styles.authorAvatar}>
                <img src="https://i.pravatar.cc/150?img=14" alt="Dr. Lorem Ipsum" />
              </div>
              <div className={styles.authorInfo}>
                <h3>Dr. Lorem Ipsum</h3>
                <span className={styles.authorTitle}>Pesquisador de IA</span>
              </div>
            </div>
            <p className={styles.authorBio}>
              Especialista em arquitetura de redes neurais e modelos generativos. Contribuindo para o ConhecendoIA desde 2022.
            </p>
            <button className={styles.btnProfile}>Ver Perfil</button>
          </div>

          {/* Related Topics Card */}
          <div className={styles.sideCard}>
            <h2 className={styles.sideCardTitle}>TÓPICOS RELACIONADOS</h2>
            <div className={styles.relatedList}>
              
              <a href="#" className={styles.relatedItem}>
                <h3 className={styles.relatedTitle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit?</h3>
                <div className={styles.relatedMeta}>12 replies • 2 hours ago</div>
              </a>
              
              <a href="#" className={styles.relatedItem}>
                <h3 className={styles.relatedTitle}>Ut enim ad minim veniam, quis nostrud exercitation?</h3>
                <div className={styles.relatedMeta}>45 replies • 1 day ago</div>
              </a>
              
              <a href="#" className={styles.relatedItem}>
                <h3 className={styles.relatedTitle}>Excepteur sint occaecat cupidatat non proident?</h3>
                <div className={styles.relatedMeta}>8 replies • 3 days ago</div>
              </a>

            </div>
          </div>
        </aside>
      </div>
    </AppLayout>
  );
}
