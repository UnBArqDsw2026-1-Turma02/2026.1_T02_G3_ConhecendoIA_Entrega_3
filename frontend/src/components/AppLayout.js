"use client";

import Link from 'next/link';
import styles from './AppLayout.module.css';

const categories = [
  { name: 'Neural Networks', icon: '🧠', href: '/neural-networks' },
  { name: 'Machine Learning', icon: '⚙️', href: '/topico' },
  { name: 'Deep Learning', icon: '🔬', href: '/deep-learning' },
  { name: 'Data Science', icon: '📊', href: '/data-science' },
];

export default function AppLayout({ children, activePage = "Home", activeCategory = "" }) {
  return (
    <div className={styles.layoutContainer}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.brand}>ConhecendoIA</div>
          <nav className={styles.nav}>
            <Link 
              href="/home" 
              className={`${styles.navLink} ${activePage === 'Home' ? styles.navLinkActive : ''}`}
            >
              Home
            </Link>
            <Link 
              href="/criar-topico" 
              className={`${styles.navLink} ${activePage === 'Discussões' ? styles.navLinkActive : ''}`}
            >
              Discussões
            </Link>
            <Link 
              href="/perfil" 
              className={`${styles.navLink} ${activePage === 'Perfil' ? styles.navLinkActive : ''}`}
            >
              Perfil
            </Link>
          </nav>
        </div>
        <div className={styles.headerRight}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
        </div>
      </header>

      {/* Body */}
      <div className={styles.body}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <h2 className={styles.sidebarTitle}>Categories</h2>
          <p className={styles.sidebarSubtitle}>Navegar por tópicos</p>
          
          <div className={styles.categoryList}>
            {categories.map((cat) => (
              <Link 
                key={cat.name} 
                href={cat.href} 
                className={`${styles.categoryItem} ${cat.name === activeCategory ? styles.activeCategory : ''}`}
              >
                <span className={styles.categoryIcon}>{cat.icon}</span>
                {cat.name}
              </Link>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className={styles.mainContent}>
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <a href="#" className={styles.footerLink}>Privacy Policy</a>
          <a href="#" className={styles.footerLink}>Community Guidelines</a>
          <a href="#" className={styles.footerLink}>Support</a>
          <a href="#" className={styles.footerLink}>About Us</a>
        </div>
        <div className={styles.footerBrand}>ConhecendoIA</div>
        <div className={styles.footerCopy}>© 2026 ConhecendoIA Lorem Ipsum</div>
      </footer>
    </div>
  );
}
