import React from 'react';
import { ArrowUp } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { scrollTo } from '../utils/smoothScroll';

export default function Footer() {
  const scrollToTop = () => {
    scrollTo(0, { duration: 1.2 });
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
