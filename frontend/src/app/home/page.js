'use client';

import { useState } from 'react';
import Link from 'next/link';
import AppLayout from '../../components/AppLayout';
import styles from './home.module.css';

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
    icon: '📘',
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
    icon: '📗',
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
    icon: '📙',
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
          <div className={styles.badge}>
            TRENDING TOPIC
          </div>
          <h2 className={styles.trendTitle}>
            Arquitetura de Redes Neurais em 2024
          </h2>
          <p className={styles.trendDesc}>
            Desenvolvimento da arquitetura neural vêm se desenvolvendo nesses últimos anos.
          </p>
          <div className={styles.trendFooter}>
            <span>👥</span>
            <span>+128 participando</span>
          </div>
        </div>

        <div className={`${styles.card} ${styles.statCard}`}>
          <div className={styles.statIcon}>
            👥
          </div>
          <div className={styles.statNumber}>
            12.4k
          </div>
          <div className={styles.statLabel}>
            MEMBROS TOTAIS
          </div>
        </div>

        <div className={`${styles.card} ${styles.statCard}`}>
          <div className={styles.statIcon}>
            💬
          </div>
          <div className={styles.statNumber}>
            852
          </div>
          <div className={styles.statLabel}>
            TÓPICOS ATIVOS
          </div>
        </div>
      </section>

      {/* DISCUSSIONS */}
      <section>
        <div className={styles.discHeader}>
          <h2 className={styles.discTitle}>
            Discussões recentes
          </h2>
          <div className={styles.tabs}>
            {['latest', 'popular'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${styles.tab} ${
                  activeTab === tab ? styles.tabActive : ''
                }`}
              >
                {tab === 'latest' ? 'Latest' : 'Popular'}
              </button>
            ))}
          </div>
        </div>

        {discussions.map((d) => (
          <div key={d.id} className={styles.discussion}>
            <div
              className={styles.discIcon}
              style={{ background: d.tagBg }}
            >
              {d.icon}
            </div>

            <div className={styles.discContent}>
              <div className={styles.discMeta}>
                <span
                  className={styles.tag}
                  style={{
                    color: d.tagColor,
                    background: d.tagBg
                  }}
                >
                  {d.tag}
                </span>
                <span className={styles.time}>
                  {d.time}
                </span>
              </div>
              <h3 className={styles.discName}>
                {d.title}
              </h3>
              <p className={styles.excerpt}>
                {d.excerpt}
              </p>
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
