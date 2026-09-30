import React from 'react';
import { ArrowUp } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="content-wrapper footer-inner">
        <div>
          <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
            © 2026 {personalInfo.name}.
          </span>
          <span style={{ marginLeft: '0.5rem' }}>
            Senior Full-Stack Software Engineer • Texas Tech MSCS
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <span className="footer-meta-pill">
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} />
            Built with React 19 & Three.js
          </span>

          <button 
            type="button" 
            onClick={scrollToTop} 
            className="btn-ghost"
            style={{ padding: '0.35rem 0.65rem' }}
            aria-label="Scroll back to top of page"
          >
            <ArrowUp size={15} />
            <span>Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
