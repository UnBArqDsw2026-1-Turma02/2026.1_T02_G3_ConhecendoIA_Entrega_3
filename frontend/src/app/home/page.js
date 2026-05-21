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
    excerpt: 'O deep learning ou aprendizado profundo baseia-se no machine learning para, a partir de uma grande quantidade de dados e após inúmeras camadas de processamento com algoritmos.',
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
    excerpt: 'Recentemente muitos estudos sobre Data Science vêm à tona e a principal discussão foi de como a manipulação de dados pela IAs interfere em seu desenvolvimento.',
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
    excerpt: 'Muitos se perguntam como uma Inteligência Artificial trabalha para que possa manipular uma quantidade quase infinita de dados.',
    comments: 21,
    views: '5.4k',
    icon: '📙',
  },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('latest');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, sans-serif;
          background-color: #f9f9fb;
        }

        .layout {
          display: flex;
          height: 100vh;
          overflow: hidden;
        }

        /* Overlay */
        .overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
          z-index: 40;
          backdrop-filter: blur(2px);
        }
        .overlay.open {
          display: block;
        }

        /* Sidebar */
        .sidebar {
          width: 260px;
          min-width: 260px;
          background: #fff;
          border-right: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          flex-shrink: 0;
          transition: transform 0.25s ease;
          z-index: 50;
        }

        .sidebar-logo {
          padding: 24px 20px;
          border-bottom: 1px solid #e5e7eb;
          font-weight: 700;
          font-size: 1.1rem;
          color: #1a1a2e;
        }

        .nav-link {
          display: block;
          padding: 10px 20px;
          font-size: 0.9rem;
          text-decoration: none;
          border-radius: 8px;
          margin: 0 8px;
          transition: all 0.2s;
        }

        .cat-section {
          padding: 0 20px;
          margin-top: 8px;
        }

        .cat-label {
          font-size: 0.7rem;
          font-weight: 600;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 12px;
          display: block;
        }

        .cat-link {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 0;
          font-size: 0.85rem;
          color: #374151;
          text-decoration: none;
        }
        .cat-link:hover {
          color: #6C63FF;
        }

        /* Main wrapper */
        .main-wrapper {
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 32px 48px;
          min-width: 0;
        }

        .main-content {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
        }

        /* Hero text */
        .hero-text {
          margin-bottom: 2rem;
        }
        .hero-text h1 {
          font-size: clamp(1.5rem, 5vw, 1.9rem);
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }
        .hero-text p {
          font-size: 0.95rem;
          color: #6b7280;
          max-width: 90%;
          line-height: 1.5;
        }

        /* TOP GRID - CORRIGIDO PARA NÃO FICAR MENOR */
        .top-grid {
          display: grid;
          grid-template-columns: 1fr 180px 180px;
          gap: 1.25rem;
          margin-bottom: 2.5rem;
          align-items: stretch;
        }

        .card {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 1rem;
          transition: box-shadow 0.15s;
          display: flex;
          flex-direction: column;
        }

        .trending-card {
          padding: 1.5rem;
          justify-content: space-between;
          min-height: 180px;
        }

        .stat-card {
          padding: 1.25rem 1rem;
          justify-content: center;
          align-items: center;
          text-align: center;
          gap: 0.5rem;
          min-height: 180px;
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          color: #1a1a2e;
          line-height: 1.2;
        }

        .stat-label {
          font-size: 0.7rem;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 500;
        }

        .trending-badge {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #6C63FF;
          background-color: #EEEDFE;
          padding: 0.25rem 0.75rem;
          border-radius: 4px;
          margin-bottom: 0.75rem;
          align-self: flex-start;
        }

        .trending-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #1a1a2e;
          margin-bottom: 0.5rem;
          line-height: 1.4;
        }

        .trending-description {
          font-size: 0.85rem;
          color: #6b7280;
          margin-bottom: 1rem;
          line-height: 1.5;
        }

        .trending-participants {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          color: #6b7280;
          margin-top: auto;
        }

        /* Discussion item */
        .disc-item {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 0.75rem;
          padding: 1rem 1.25rem;
          display: flex;
          gap: 1rem;
          cursor: pointer;
          transition: box-shadow 0.15s;
          margin-bottom: 0.75rem;
        }
        .disc-item:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          border-color: #d1d5db;
        }

        /* Hamburger */
        .hamburger {
          display: none;
          position: fixed;
          top: 1rem;
          left: 1rem;
          z-index: 60;
          background: #6C63FF;
          color: white;
          border: none;
          border-radius: 0.5rem;
          width: 40px;
          height: 40px;
          font-size: 1.4rem;
          cursor: pointer;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        }

        /* ========== RESPONSIVIDADE ========== */
        @media (max-width: 1100px) {
          .main-wrapper {
            padding: 28px 32px;
          }
          .top-grid {
            grid-template-columns: 1fr 160px 160px;
            gap: 1rem;
          }
          .trending-card, .stat-card {
            min-height: 160px;
          }
        }

        @media (max-width: 900px) {
          .hamburger {
            display: flex;
          }
          .sidebar {
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            transform: translateX(-100%);
            width: min(75%, 260px);
            min-width: unset;
            box-shadow: 2px 0 12px rgba(0, 0, 0, 0.1);
          }
          .sidebar.open {
            transform: translateX(0);
          }
          .main-wrapper {
            padding: 24px 24px;
          }
          .top-grid {
            grid-template-columns: 1fr 1fr;
          }
          .trending-card {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 640px) {
          .main-wrapper {
            padding: 20px 16px;
          }
          .hero-text h1 {
            font-size: 1.6rem;
          }
          .stat-number {
            font-size: 1.7rem;
          }
          .trending-title {
            font-size: 1rem;
          }
          .trending-card, .stat-card {
            min-height: auto;
          }
        }

        @media (max-width: 480px) {
          .top-grid {
            grid-template-columns: 1fr;
          }
          .trending-card {
            grid-column: unset;
          }
          .stat-card {
            flex-direction: row;
            justify-content: space-between;
            padding: 0.75rem 1rem;
          }
          .stat-card .stat-number {
            font-size: 1.5rem;
          }
        }
      `}</style>

      <button className="hamburger" onClick={() => setSidebarOpen(true)} aria-label="Menu">
        ☰
      </button>

      <div
        className={`overlay${sidebarOpen ? ' open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      <div className="layout">
        {/* Sidebar */}
        <aside className={`sidebar${sidebarOpen ? ' open' : ''}`}>
          <div className="sidebar-logo">ConhecendoIA</div>
          <nav style={{ padding: '0.5rem 0' }}>
            {[
              { label: 'Home', href: '#', active: true },
              { label: 'Discussões', href: '#', active: false },
              { label: 'Perfil', href: '#', active: false },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="nav-link"
                style={{
                  color: item.active ? '#6C63FF' : '#6b7280',
                  fontWeight: item.active ? 600 : 400,
                  backgroundColor: item.active ? '#EEEDFE' : 'transparent',
                }}
                onClick={() => setSidebarOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="cat-section">
            <span className="cat-label">Categorias</span>
            {categories.map((cat) => (
              <a key={cat.name} href="#" className="cat-link" onClick={() => setSidebarOpen(false)}>
                <span style={{ fontSize: '1rem' }}>{cat.icon}</span>
                {cat.name}
              </a>
            ))}
          </div>
        </aside>

        {/* Main */}
        <div className="main-wrapper">
          <div className="main-content">
            {/* Hero text */}
            <div className="hero-text">
              <h1>Bem Vindo ao maior Fórum de Inteligência Artificial</h1>
              <p>
                Aqui você pode encontrar todo tipo de conteúdo sobre IAs e trocar ideias com diferentes pessoas sobre
                diferentes assuntos!
              </p>
            </div>

            {/* Grid superior - agora com altura consistente */}
            <div className="top-grid">
              <div className="card trending-card">
                <div>
                  <div className="trending-badge">TRENDING TOPIC</div>
                  <h2 className="trending-title">Arquitetura de Redes Neurais em 2024</h2>
                  <p className="trending-description">
                    Desenvolvimento da arquitetura neural vêm se desenvolvendo nesses últimos anos.
                  </p>
                </div>
                <div className="trending-participants">
                  <span>📈</span>
                  <span>+128 participando</span>
                </div>
              </div>

              <div className="card stat-card">
                <span style={{ fontSize: '2rem' }}>👥</span>
                <div className="stat-number">12.4k</div>
                <div className="stat-label">MEMBROS TOTAIS</div>
              </div>

              <div className="card stat-card">
                <span style={{ fontSize: '2rem' }}>💬</span>
                <div className="stat-number">852</div>
                <div className="stat-label">TÓPICOS ATIVOS</div>
              </div>
            </div>

            {/* Seção de discussões */}
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1rem',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                }}
              >
                <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1a1a2e' }}>Discussões recentes</h2>
                <div style={{ display: 'flex', gap: '0.25rem' }}>
                  {['latest', 'popular'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      style={{
                        padding: '0.3rem 1rem',
                        fontSize: '0.8rem',
                        borderRadius: '6px',
                        border: 'none',
                        cursor: 'pointer',
                        backgroundColor: activeTab === tab ? '#6C63FF' : 'transparent',
                        color: activeTab === tab ? '#fff' : '#6b7280',
                        fontWeight: activeTab === tab ? 600 : 400,
                      }}
                    >
                      {tab === 'latest' ? 'Latest' : 'Popular'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                {discussions.map((d) => (
                  <div key={d.id} className="disc-item">
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        backgroundColor: d.tagBg,
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.25rem',
                      }}
                    >
                      {d.icon}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          marginBottom: '0.25rem',
                          flexWrap: 'wrap',
                        }}
                      >
                        <span
                          style={{
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            letterSpacing: '0.06em',
                            color: d.tagColor,
                            backgroundColor: d.tagBg,
                            padding: '0.15rem 0.6rem',
                            borderRadius: '4px',
                          }}
                        >
                          {d.tag}
                        </span>
                        <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>{d.time}</span>
                      </div>
                      <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1a1a2e', marginBottom: '0.3rem' }}>
                        {d.title}
                      </h3>
                      <p
                        style={{
                          fontSize: '0.8rem',
                          color: '#6b7280',
                          lineHeight: 1.4,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {d.excerpt}
                      </p>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        gap: '0.25rem',
                        flexShrink: 0,
                      }}
                    >
                      <span style={{ fontSize: '0.75rem', color: '#6b7280', whiteSpace: 'nowrap' }}>💬 {d.comments}</span>
                      <span style={{ fontSize: '0.75rem', color: '#6b7280', whiteSpace: 'nowrap' }}>👁️ {d.views}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}