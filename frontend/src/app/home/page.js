'use client';

import { useState } from 'react';
import Link from 'next/link';
import AppLayout from '../../components/AppLayout';
import styles from './home.module.css';

const DeepLearningIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6C63FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/>
    <polygon points="12 7 17 10 17 14 12 17 7 14 7 10 12 7"/>
  </svg>
);

const DataScienceIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0F9B71" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="6" rx="8" ry="3"/>
    <path d="M4 6v4c0 1.66 3.58 3 8 3s8-1.34 8-3V6"/>
    <path d="M4 10v4c0 1.66 3.58 3 8 3s8-1.34 8-3v-4"/>
    <path d="M4 14v4c0 1.66 3.58 3 8 3s8-1.34 8-3v-4"/>
  </svg>
);

const MachineLearningIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2F80ED" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
  </svg>
);

const discussions = [
  {
    id: 1,
    tag: 'DEEP LEARNING',
    tagColor: '#6C63FF',
    tagBg: '#F1EEFF',
    time: '2 hours ago by @lorem_ipsum',
    title: 'Como funciona o DEEP LEARNING no aprendizado de máquina?',
    excerpt:
      'O deep learning ou aprendizado profundo baseia-se no machine learning para, a partir de uma grande quantidade de dados e após inúmeras camadas de processamento com algoritmos.',
    comments: 24,
    views: '1.2k',
    icon: <DeepLearningIcon />,
  },
  {
    id: 2,
    tag: 'DATA SCIENCE',
    tagColor: '#0F9B71',
    tagBg: '#E8FFF7',
    time: '5 hours ago by @fabio_ali',
    title: 'Como a ciência de dados afeta o desenvolvimento das IAs',
    excerpt:
      'Recentemente muitos estudos sobre Data Science vêm à tona e a principal discussão foi de como a manipulação de dados pela IAs interfere em seu desenvolvimento.',
    comments: 12,
    views: '842',
    icon: <DataScienceIcon />,
  },
  {
    id: 3,
    tag: 'MACHINE LEARNING',
    tagColor: '#2F80ED',
    tagBg: '#EEF5FF',
    time: 'Yesterday by @conhecendoia',
    title: 'Como funciona o Machine Learning?',
    excerpt:
      'Muitos se perguntam como uma Inteligência Artificial trabalha para que possa manipular uma quantidade quase infinita de dados.',
    comments: 39,
    views: '2.4k',
    icon: <MachineLearningIcon />,
  },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('latest');

  return (
    <AppLayout activePage="Home">
      <h1 className={styles.title}>
        Bem Vindo ao maior Fórum de Inteligência Artificial
      </h1>

      <p className={styles.subtitle}>
        Aqui você pode encontrar todo tipo de conteúdo sobre IAs e trocar ideias com diferentes pessoas sobre diferentes assuntos!
      </p>

      {/* GRID */}
      <section className={styles.topGrid}>
        <div className={`${styles.card} ${styles.trendCard}`}>
          <div className={styles.badge}>TRENDING TOPIC</div>
          <h2 className={styles.trendTitle}>Arquitetura de Redes Neurais em 2024</h2>
          <p className={styles.trendDesc}>
            Desenvolvimento da arquitetura neural vêm se desenvolvendo nesses últimos anos.
          </p>
          <div className={styles.trendFooter}>
            <span>👥</span>
            <span>+128 participando</span>
          </div>
        </div>

        <div className={`${styles.card} ${styles.statCard}`}>
          <div className={styles.statIcon}>👥</div>
          <div className={styles.statNumber}>12.4k</div>
          <div className={styles.statLabel}>MEMBROS TOTAIS</div>
        </div>

        <div className={`${styles.card} ${styles.statCard}`}>
          <div className={styles.statIcon}>💬</div>
          <div className={styles.statNumber}>852</div>
          <div className={styles.statLabel}>TÓPICOS ATIVOS</div>
        </div>
      </section>

      {/* DISCUSSIONS */}
      <section>
        <div className={styles.discHeader}>
          <h2 className={styles.discTitle}>Discussões recentes</h2>
          <div className={styles.tabs}>
            {['latest', 'popular'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
              >
                {tab === 'latest' ? 'Latest' : 'Popular'}
              </button>
            ))}
          </div>
        </div>

        {discussions.map((d) => (
          <div key={d.id} className={styles.discussion}>
            <div className={styles.discIcon} style={{ background: d.tagBg }}>
              {d.icon}
            </div>

            <div className={styles.discContent}>
              <div className={styles.discMeta}>
                <span className={styles.tag} style={{ color: d.tagColor, background: d.tagBg }}>
                  {d.tag}
                </span>
                <span className={styles.time}>{d.time}</span>
              </div>
              <h3 className={styles.discName}>{d.title}</h3>
              <p className={styles.excerpt}>{d.excerpt}</p>
            </div>

            <div className={styles.stats}>
              <span>💬 {d.comments}</span>
              <span>👁 {d.views}</span>
            </div>
          </div>
        ))}
      </section>
    </AppLayout>
  );
}