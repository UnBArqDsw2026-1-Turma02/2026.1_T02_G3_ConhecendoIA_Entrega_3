'use client';

import { useState } from 'react';

const categories = [
  { name: 'Neural Networks', icon: '🧠' },
  { name: 'Machine Learning', icon: '⚙️' },
  { name: 'Deep Learning', icon: '🔬' },
  { name: 'Data Science', icon: '📊' },
  { name: 'Rules', icon: '📋' },
];

const discussions = [
  {
    id: 1,
    tag: 'DEEP LEARNING',
    tagColor: '#6C63FF',
    tagBg: '#EEEDFE',
    time: '3 hours ago by @lorem_ipsum',
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
    tagColor: '#0F6E56',
    tagBg: '#E1F5EE',
    time: '5 hours ago by @fabio_ali',
    title: 'Como a ciência de dados afeta o desenvolvimento das IAs',
    excerpt:
      'Recentemente muitos estudos sobre Data Science vêm à tona e a principal discussão foi de como a manipulação de dados pela IAs interfere em seu desenvolvimento.',
    comments: 12,
    views: '843',
    icon: '📗',
  },
  {
    id: 3,
    tag: 'MACHINE LEARNING',
    tagColor: '#185FA5',
    tagBg: '#E6F1FB',
    time: 'Yesterday by @conhecendoia',
    title: 'Como funciona o Machine Learning?',
    excerpt:
      'Muitos se perguntam como uma Inteligência Artificial trabalha para que possa manipular uma quantidade quase infinita de dados.',
    comments: 21,
    views: '5.4k',
    icon: '📙',
  },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('latest');

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9f9fb', fontFamily: 'system-ui, sans-serif' }}>

      {/* Sidebar */}
      <aside style={{
        width: 200,
        backgroundColor: '#ffffff',
        borderRight: '1px solid #e5e7eb',
        padding: '24px 0',
        flexShrink: 0,
      }}>
        {/* Logo */}
        <div style={{ padding: '0 20px 24px', borderBottom: '1px solid #e5e7eb' }}>
          <span style={{ fontWeight: 700, fontSize: 15, color: '#1a1a2e' }}>ConhecendoIA</span>
        </div>

        {/* Nav */}
        <nav style={{ padding: '16px 0' }}>
          {[
            { label: 'Home', href: '#', active: true },
            { label: 'Discussões', href: '#' },
            { label: 'Perfil', href: '#' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              style={{
                display: 'block',
                padding: '8px 20px',
                fontSize: 14,
                color: item.active ? '#6C63FF' : '#6b7280',
                fontWeight: item.active ? 600 : 400,
                textDecoration: 'none',
                backgroundColor: item.active ? '#EEEDFE' : 'transparent',
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Categories */}
        <div style={{ padding: '0 20px' }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>
            Categorias
          </p>
          {categories.map((cat) => (
            <a
              key={cat.name}
              href="#"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 0',
                fontSize: 13,
                color: '#374151',
                textDecoration: 'none',
              }}
            >
              <span style={{ fontSize: 14 }}>{cat.icon}</span>
              {cat.name}
            </a>
          ))}
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: '32px 40px', maxWidth: 900 }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#1a1a2e', margin: '0 0 8px' }}>
            Bem Vindo ao maior Fórum de Inteligência Artificial
          </h1>
          <p style={{ fontSize: 14, color: '#6b7280', margin: 0 }}>
            Aqui você pode encontrar todo tipo de conteúdo sobre IAs e trocar ideias com diferentes pessoas sobre diferentes assuntos!
          </p>
        </div>

        {/* Trending + Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px 140px', gap: 16, marginBottom: 32 }}>

          {/* Trending card */}
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: 12,
            padding: '20px 24px',
          }}>
            <span style={{
              display: 'inline-block',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: '#6C63FF',
              backgroundColor: '#EEEDFE',
              padding: '3px 8px',
              borderRadius: 4,
              marginBottom: 10,
            }}>
              TRENDING TOPIC
            </span>
            <h2 style={{ fontSize: 15, fontWeight: 600, color: '#1a1a2e', margin: '0 0 8px', lineHeight: 1.4 }}>
              Arquitetura de Redes Neurais em 2024
            </h2>
            <p style={{ fontSize: 12, color: '#6b7280', margin: '0 0 12px' }}>
              Desenvolvimento da arquitetura neural vêm se desenvolvendo nesses últimos anos.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#6b7280' }}>
              <span>👥</span>
              <span>+128 participando</span>
            </div>
          </div>

          {/* Stat: Membros */}
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: 12,
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
          }}>
            <span style={{ fontSize: 24 }}>👥</span>
            <span style={{ fontSize: 22, fontWeight: 700, color: '#1a1a2e' }}>12.4k</span>
            <span style={{ fontSize: 11, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Membros Totais
            </span>
          </div>

          {/* Stat: Tópicos */}
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: 12,
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
          }}>
            <span style={{ fontSize: 24 }}>💬</span>
            <span style={{ fontSize: 22, fontWeight: 700, color: '#1a1a2e' }}>852</span>
            <span style={{ fontSize: 11, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Tópicos Ativos
            </span>
          </div>
        </div>

        {/* Discussões recentes */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: '#1a1a2e', margin: 0 }}>Discussões recentes</h2>
            <div style={{ display: 'flex', gap: 4 }}>
              {['latest', 'popular'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: '5px 14px',
                    fontSize: 13,
                    borderRadius: 6,
                    border: 'none',
                    cursor: 'pointer',
                    backgroundColor: activeTab === tab ? '#6C63FF' : 'transparent',
                    color: activeTab === tab ? '#ffffff' : '#6b7280',
                    fontWeight: activeTab === tab ? 600 : 400,
                  }}
                >
                  {tab === 'latest' ? 'Latest' : 'Popular'}
                </button>
              ))}
            </div>
          </div>

          {/* Discussion list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {discussions.map((d) => (
              <div
                key={d.id}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: 10,
                  padding: '16px 20px',
                  display: 'flex',
                  gap: 14,
                  marginBottom: 8,
                  cursor: 'pointer',
                  transition: 'box-shadow 0.15s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
              >
                {/* Icon */}
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  backgroundColor: d.tagBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                  flexShrink: 0,
                }}>
                  {d.icon}
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      color: d.tagColor,
                      backgroundColor: d.tagBg,
                      padding: '2px 7px',
                      borderRadius: 4,
                    }}>
                      {d.tag}
                    </span>
                    <span style={{ fontSize: 12, color: '#9ca3af' }}>{d.time}</span>
                  </div>
                  <h3 style={{ fontSize: 14, fontWeight: 600, color: '#1a1a2e', margin: '0 0 4px', lineHeight: 1.4 }}>
                    {d.title}
                  </h3>
                  <p style={{ fontSize: 13, color: '#6b7280', margin: 0, lineHeight: 1.5, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {d.excerpt}
                  </p>
                </div>

                {/* Stats */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', gap: 4, flexShrink: 0 }}>
                  <span style={{ fontSize: 12, color: '#6b7280' }}>💬 {d.comments}</span>
                  <span style={{ fontSize: 12, color: '#6b7280' }}>👁 {d.views}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer (inline abaixo do main) */}
      <style>{`
        @media (max-width: 768px) {
          aside { display: none; }
        }
      `}</style>
    </div>
  );
}