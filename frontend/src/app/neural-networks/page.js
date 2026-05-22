"use client";

import AppLayout from '../../components/AppLayout';
import styles from '../topico/topico.module.css';

export default function NeuralNetworksPage() {
  return (
    <AppLayout activePage="Discussões" activeCategory="Neural Networks">
      <div className={styles.pageContainer}>
        {/* Main Content Column */}
        <div className={styles.mainColumn}>
          {/* Main Post Card */}
          <article className={styles.postCard}>
            <div className={styles.postHeaderMeta}>
              <span className={styles.postBadge}>Neural Networks</span>
              <span className={styles.postTime}>Publicado 5 horas atrás</span>
            </div>
            
            <h1 className={styles.postTitle}>Fundamentos de Redes Neurais Artificiais</h1>
            
            <div className={styles.postBody}>
              <p>Uma rede neural artificial (RNA) é um modelo computacional inspirado no sistema nervoso central de um animal, capaz de realizar aprendizado de máquina e reconhecimento de padrões.</p>
              <br />
              <p>Essas redes são compostas por neurônios artificiais conectados em camadas. A forma como os pesos dessas conexões são ajustados (através de algoritmos como backpropagation) é o que permite que a rede "aprenda" a partir dos dados. Quais dicas vocês dariam para quem está começando a estudar perceptrons multicamadas?</p>
            </div>

            <div className={styles.postActions}>
              <div className={styles.actionGroup}>
                <button className={`${styles.actionBtn} ${styles.actionBtnPrimary}`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                  89
                </button>
                <button className={styles.actionBtn}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                  15 Comentários
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

            {/* Comment Item */}
            <div className={styles.commentItem}>
              <div className={styles.commentHeader}>
                <div className={styles.commentAuthor}>
                  <div className={styles.avatar}>
                    <img src="https://i.pravatar.cc/150?img=5" alt="Alice Dev" />
                  </div>
                  <span className={styles.authorName}>Alice Dev</span>
                </div>
                <span className={styles.commentTime}>2 horas atrás</span>
              </div>
              <div className={styles.commentBody}>
                <p>Eu recomendo focar bastante na matemática base por trás do gradiente descendente. Entender as derivadas parciais faz a magia do backpropagation deixar de ser uma "caixa preta".</p>
              </div>
              <div className={styles.commentActions}>
                <button className={styles.commentActionBtn}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                  24
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
                <img src="https://i.pravatar.cc/150?img=12" alt="Maria Silva" />
              </div>
              <div className={styles.authorInfo}>
                <h3>Maria Silva</h3>
                <span className={styles.authorTitle}>Engenheira de Machine Learning</span>
              </div>
            </div>
            <p className={styles.authorBio}>
              Entusiasta de inteligência artificial e professora. Ajudo desenvolvedores a entrarem na área de dados.
            </p>
            <button className={styles.btnProfile}>Ver Perfil</button>
          </div>

          <div className={styles.sideCard}>
            <h2 className={styles.sideCardTitle}>TÓPICOS RELACIONADOS</h2>
            <div className={styles.relatedList}>
              <a href="#" className={styles.relatedItem}>
                <h3 className={styles.relatedTitle}>Funções de Ativação: ReLU vs Sigmoid</h3>
                <div className={styles.relatedMeta}>32 replies • 1 day ago</div>
              </a>
              <a href="#" className={styles.relatedItem}>
                <h3 className={styles.relatedTitle}>Problema de Vanishing Gradient</h3>
                <div className={styles.relatedMeta}>18 replies • 2 days ago</div>
              </a>
            </div>
          </div>
        </aside>
      </div>
    </AppLayout>
  );
}
