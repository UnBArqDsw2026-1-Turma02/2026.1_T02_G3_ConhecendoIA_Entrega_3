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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  return (
    <>
      <style>{`
        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
        }

        body{
          font-family:Inter,system-ui,sans-serif;
          background:#f5f6fb;
          overflow-x:hidden;
        }

        .page{
          min-height:100vh;
          display:flex;
          flex-direction:column;
        }

        /* ───────── TOPBAR ───────── */

        .topbar{
          width:100%;
          height:58px;

          background:#fff;

          border-bottom:1px solid #e5e7eb;

          display:flex;
          align-items:center;

          padding:0 24px;

          position:sticky;
          top:0;
          z-index:100;
        }

        .logo{
          font-size:16px;
          font-weight:800;

          color:#111827;

          margin-right:28px;

          white-space:nowrap;

          display:flex;
          align-items:center;

          flex-shrink:0;
        }

        .nav{
          display:flex;
          align-items:center;
          gap:6px;
        }

        .nav-link{
          font-size:13px;
          font-weight:500;

          color:#6b7280;
          text-decoration:none;

          padding:8px 14px;

          border-radius:8px;

          transition:.15s;
        }

        .nav-link:hover{
          background:#f3f4f6;
        }

        .nav-link.active{
          background:#f1eeff;
          color:#6C63FF;
          font-weight:700;
        }

        .bell{
          margin-left:auto;

          font-size:14px;

          display:flex;
          align-items:center;

          color:#6b7280;

          cursor:pointer;
        }

        /* ───────── BODY ───────── */

        .body{
          display:flex;
          flex:1;
        }

        /* ───────── SIDEBAR ───────── */

        .sidebar{
          width:220px;
          min-width:220px;

          background:#fff;

          border-right:1px solid #e5e7eb;

          padding-top:24px;
        }

        .sidebar-title{
          padding:0 24px;

          font-size:13px;
          font-weight:700;

          color:#9ca3af;

          text-transform:uppercase;

          margin-bottom:4px;
        }

        .sidebar-sub{
          padding:0 24px;

          font-size:12px;

          color:#b0b6c2;

          margin-bottom:24px;
        }

        .category{
          width:100%;

          display:flex;
          align-items:center;

          gap:12px;

          padding:11px 24px;

          text-decoration:none;

          color:#374151;

          font-size:15px;
          font-weight:500;

          transition:.15s;
        }

        .category:hover{
          background:#f9fafb;
          color:#6C63FF;
        }

        .category span:first-child{
          font-size:18px;

          width:20px;

          display:flex;
          justify-content:center;
        }

        /* ───────── MAIN ───────── */

        .main{
          flex:1;

          padding:34px 32px;
        }

        .title{
          font-size:56px;
          line-height:1.1;

          font-weight:800;

          color:#111827;

          max-width:820px;

          margin-bottom:16px;
        }

        .subtitle{
          font-size:15px;

          color:#6b7280;

          margin-bottom:34px;
        }

        /* ───────── GRID ───────── */

        .top-grid{
          display:grid;

          grid-template-columns:1fr 165px 165px;

          gap:16px;

          margin-bottom:34px;
        }

        .card{
          background:#fff;

          border:1px solid #eceef3;

          border-radius:16px;
        }

        .trend-card{
          padding:24px;
        }

        .badge{
          display:inline-flex;

          background:#F1EEFF;

          color:#6C63FF;

          font-size:10px;
          font-weight:700;

          padding:4px 8px;

          border-radius:6px;

          margin-bottom:16px;
        }

        .trend-title{
          font-size:24px;

          line-height:1.25;

          font-weight:800;

          color:#111827;

          margin-bottom:14px;
        }

        .trend-desc{
          font-size:14px;

          color:#6b7280;

          line-height:1.7;

          margin-bottom:28px;
        }

        .trend-footer{
          display:flex;
          align-items:center;

          gap:8px;

          font-size:13px;

          color:#6b7280;
        }

        .stat-card{
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;

          text-align:center;

          padding:20px;
        }

        .stat-icon{
          font-size:26px;

          margin-bottom:12px;
        }

        .stat-number{
          font-size:22px;

          font-weight:800;

          color:#111827;

          margin-bottom:8px;
        }

        .stat-label{
          font-size:11px;

          color:#9ca3af;

          font-weight:700;

          letter-spacing:.04em;
        }

        /* ───────── DISCUSSIONS ───────── */

        .disc-header{
          display:flex;
          align-items:center;
          justify-content:space-between;

          margin-bottom:16px;
        }

        .disc-title{
          font-size:24px;

          font-weight:800;

          color:#111827;
        }

        .tabs{
          display:flex;
          gap:8px;
        }

        .tab{
          border:none;

          background:transparent;

          padding:8px 14px;

          border-radius:8px;

          cursor:pointer;

          font-size:13px;

          color:#6b7280;

          font-weight:500;
        }

        .tab.active{
          background:#111827;

          color:#fff;
        }

        .discussion{
          background:#fff;

          border:1px solid #eceef3;

          border-radius:14px;

          padding:18px 20px;

          display:flex;

          align-items:flex-start;

          gap:16px;

          margin-bottom:14px;

          transition:.15s;
        }

        .discussion:hover{
          box-shadow:0 2px 12px rgba(0,0,0,.05);
        }

        .disc-icon{
          width:42px;
          height:42px;

          border-radius:10px;

          display:flex;
          align-items:center;
          justify-content:center;

          flex-shrink:0;

          font-size:18px;
        }

        .disc-content{
          flex:1;
        }

        .disc-meta{
          display:flex;
          align-items:center;

          gap:8px;

          margin-bottom:8px;

          flex-wrap:wrap;
        }

        .tag{
          font-size:10px;

          font-weight:700;

          padding:4px 8px;

          border-radius:5px;
        }

        .time{
          font-size:11px;

          color:#9ca3af;
        }

        .disc-name{
          font-size:18px;

          font-weight:700;

          color:#111827;

          margin-bottom:8px;
        }

        .excerpt{
          font-size:14px;

          color:#6b7280;

          line-height:1.6;
        }

        .stats{
          display:flex;
          flex-direction:column;

          gap:8px;

          white-space:nowrap;

          color:#6b7280;

          font-size:13px;
        }

        /* ───────── FOOTER ───────── */

        .footer{
          background:#fff;

          border-top:1px solid #e5e7eb;

          padding:18px 24px;

          text-align:center;
        }

        .footer-links{
          display:flex;
          justify-content:center;

          gap:22px;

          flex-wrap:wrap;

          margin-bottom:10px;
        }

        .footer-link{
          font-size:12px;

          color:#9ca3af;

          text-decoration:none;
        }

        .footer-brand{
          font-size:13px;

          font-weight:700;

          color:#111827;

          margin-bottom:4px;
        }

        .footer-copy{
          font-size:11px;

          color:#9ca3af;
        }

        /* ───────── RESPONSIVE ───────── */

        @media(max-width:1000px){

          .sidebar{
            display:none;
          }

          .top-grid{
            grid-template-columns:1fr;
          }

          .main{
            padding:24px;
          }

          .title{
            font-size:40px;
          }
        }

        @media(max-width:640px){

          .topbar{
            padding:0 16px;
          }

          .logo{
            font-size:15px;
          }

          .nav-link{
            font-size:12px;
            padding:7px 10px;
          }

          .main{
            padding:20px 16px;
          }

          .title{
            font-size:32px;
          }

          .discussion{
            flex-direction:column;
          }

          .stats{
            flex-direction:row;
          }
        }
        .logo::before,
        .logo::after,
        .logo *::before,
        .logo *::after {
          display: none !important;
          content: none !important;
        }
      `}</style>

      <div className="page">

        {/* ───────── TOPBAR ───────── */}

        <header className="topbar">

       <div 
  className="logo" 
  style={{ 
    all: 'revert',
    display: 'flex', 
    alignItems: 'center', 
    background: 'transparent', 
    border: 'none',
    fontWeight: 800,
    color: '#111827',
    marginRight: '28px'
  }}
>
  ConhecendoIA
</div>

          <nav className="nav">

            <a href="#" className="nav-link active">
              Home
            </a>

            <a href="#" className="nav-link">
              Discussões
            </a>

            <a href="#" className="nav-link">
              Perfil
            </a>

          </nav>
          

          <div className="bell">
            🔔
          </div>

        </header>

        {/* ───────── BODY ───────── */}

        <div className="body">

          {/* SIDEBAR */}

          <aside className="sidebar">

            <div className="sidebar-title">
              Categorias
            </div>

            <div className="sidebar-sub">
              Navegar por tópicos
            </div>

            {categories.map((cat) => (
              <a
                key={cat.name}
                href="#"
                className="category"
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </a>
            ))}

          </aside>

          {/* MAIN */}

          <main className="main">

            <h1 className="title">
              Bem Vindo ao maior Fórum de Inteligência Artificial
            </h1>

            <p className="subtitle">
              Aqui você pode encontrar todo tipo de conteúdo sobre IAs e trocar ideias com diferentes pessoas sobre diferentes assuntos!
            </p>

            {/* GRID */}

            <section className="top-grid">

              <div className="card trend-card">

                <div className="badge">
                  TRENDING TOPIC
                </div>

                <h2 className="trend-title">
                  Arquitetura de Redes Neurais em 2024
                </h2>

                <p className="trend-desc">
                  Desenvolvimento da arquitetura neural vêm se desenvolvendo nesses últimos anos.
                </p>

                <div className="trend-footer">
                  <span>👥</span>
                  <span>+128 participando</span>
                </div>

              </div>

              <div className="card stat-card">

                <div className="stat-icon">
                  👥
                </div>

                <div className="stat-number">
                  12.4k
                </div>

                <div className="stat-label">
                  MEMBROS TOTAIS
                </div>

              </div>

              <div className="card stat-card">

                <div className="stat-icon">
                  💬
                </div>

                <div className="stat-number">
                  852
                </div>

                <div className="stat-label">
                  TÓPICOS ATIVOS
                </div>

              </div>

            </section>

            {/* DISCUSSIONS */}

            <section>

              <div className="disc-header">

                <h2 className="disc-title">
                  Discussões recentes
                </h2>

                <div className="tabs">

                  {['latest', 'popular'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`tab ${
                        activeTab === tab ? 'active' : ''
                      }`}
                    >
                      {tab === 'latest'
                        ? 'Latest'
                        : 'Popular'}
                    </button>
                  ))}

                </div>

              </div>

              {discussions.map((d) => (

                <div
                  key={d.id}
                  className="discussion"
                >

                  <div
                    className="disc-icon"
                    style={{
                      background:d.tagBg
                    }}
                  >
                    {d.icon}
                  </div>

                  <div className="disc-content">

                    <div className="disc-meta">

                      <span
                        className="tag"
                        style={{
                          color:d.tagColor,
                          background:d.tagBg
                        }}
                      >
                        {d.tag}
                      </span>

                      <span className="time">
                        {d.time}
                      </span>

                    </div>

                    <h3 className="disc-name">
                      {d.title}
                    </h3>

                    <p className="excerpt">
                      {d.excerpt}
                    </p>

                  </div>

                  <div className="stats">
                    <span>💬 {d.comments}</span>
                    <span>👁 {d.views}</span>
                  </div>

                </div>

              ))}

            </section>

          </main>

        </div>

        {/* FOOTER */}

        <footer className="footer">

          <div className="footer-links">

            <a href="#" className="footer-link">
              Privacy Policy
            </a>

            <a href="#" className="footer-link">
              Community Guidelines
            </a>

            <a href="#" className="footer-link">
              Support
            </a>

            <a href="#" className="footer-link">
              About Us
            </a>

          </div>

          <div className="footer-brand">
            ConhecendoIA
          </div>

          <div className="footer-copy">
            © 2026 ConhecendoIA. Lorem ipsum
          </div>

        </footer>

      </div>
    </>
  );
}