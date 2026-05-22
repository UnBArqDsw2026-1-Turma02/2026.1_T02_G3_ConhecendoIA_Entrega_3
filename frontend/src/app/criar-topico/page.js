"use client";

import { useRouter } from 'next/navigation';
import styles from './criar.module.css';
import AppLayout from '../../components/AppLayout';

export default function CriarTopicoPage() {
  const router = useRouter();

  const handleCancel = () => {
    router.back();
  };

  const handlePublish = (e) => {
    e.preventDefault();
    alert("Tópico publicado com sucesso!");
    router.push('/home');
  };

  return (
    <AppLayout activePage="Discussões">
      <div className={styles.contentWrapper}>
        <div className={styles.badge}>NOVA DISCUSSÃO</div>
        <h1 className={styles.pageTitle}>Criar Tópico</h1>
        <p className={styles.pageSubtitle}>
          Inicie uma nova conversa na comunidade. Seja claro e objetivo na sua dúvida.
        </p>

        <div className={styles.formCard}>
          <form onSubmit={handlePublish}>
            <div className={styles.formGroup}>
              <label htmlFor="title" className={styles.formLabel}>Título da Discussão</label>
              <input 
                type="text" 
                id="title" 
                className={styles.formInput} 
                placeholder="Ex: Dúvida sobre camadas em Redes Neurais..." 
              />
            </div>

            <div className={styles.formRow}>
              <div>
                <label htmlFor="category" className={styles.formLabel}>Categoria</label>
                <select id="category" className={styles.formSelect} defaultValue="Machine Learning">
                  <option value="Neural Networks">Neural Networks</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Deep Learning">Deep Learning</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Rules">Rules</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="tags" className={styles.formLabel}>Tags (Opcional)</label>
                <input 
                  type="text" 
                  id="tags" 
                  className={styles.formInput} 
                  placeholder="Ex: algoritmos, regressao" 
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.formLabel}>Mensagem</label>
              <div className={styles.editorContainer}>
                <div className={styles.editorToolbar}>
                  <button type="button" className={styles.toolbarBtn}><strong>B</strong></button>
                  <button type="button" className={styles.toolbarBtn}><em>I</em></button>
                  <button type="button" className={styles.toolbarBtn}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                  </button>
                  <button type="button" className={styles.toolbarBtn}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                  </button>
                  <button type="button" className={styles.toolbarBtn}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                  </button>
                  <button type="button" className={styles.toolbarBtn}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                  </button>
                </div>
                <textarea 
                  id="message"
                  className={styles.formTextarea} 
                  placeholder="Descreva sua dúvida, ideia ou compartilhe seu conhecimento aqui..."
                ></textarea>
              </div>
            </div>

            <div className={styles.actions}>
              <button type="button" className={styles.btnCancel} onClick={handleCancel}>
                Cancelar
              </button>
              <button type="submit" className={styles.btnSubmit}>
                + Publicar
              </button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
