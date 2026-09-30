import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { Menu, X, FileText } from 'lucide-react';

export default function Header({ 
  currentPath, 
  onNavigate, 
  onOpenResume 
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const navLinksRef = useRef(null);
  const itemRefs = useRef({});
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });

  const updateIndicator = useCallback(() => {
    if (currentPath !== '/') {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
      return;
    }
    const navEl = navLinksRef.current;
    const activeEl = itemRefs.current[activeSection];
    if (navEl && activeEl) {
      const navRect = navEl.getBoundingClientRect();
      const itemRect = activeEl.getBoundingClientRect();
      setIndicatorStyle({
        left: itemRect.left - navRect.left,
        width: itemRect.width,
        opacity: 1,
      });
    } else {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [activeSection, currentPath]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (currentPath !== '/') return;

      const sections = ['contact', 'about', 'capabilities', 'experience', 'macpulse'];
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Bottom of page detection (Contact active)
      if (scrollY + viewportHeight >= docHeight - 80) {
        setActiveSection('contact');
        return;
      }

      // Check if user is still above the first section (hero)
      const macpulseEl = document.getElementById('macpulse');
      if (macpulseEl) {
        const macpulseTop = macpulseEl.offsetTop - 200;
        if (scrollY < macpulseTop) {
          setActiveSection('');
          return;
        }
      }

      // Test sections from bottom to top
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop - 200;
          if (scrollY >= top) {
            setActiveSection(id);
            return;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPath]);

  // Update sliding indicator position on active section or path change
  useLayoutEffect(() => {
    const animId = requestAnimationFrame(() => {
      updateIndicator();
    });
    return () => cancelAnimationFrame(animId);
  }, [updateIndicator]);

  useEffect(() => {
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [updateIndicator]);

  const handleNavClick = (e, target) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (currentPath === '/projects/macpulse' && target.startsWith('#')) {
      const cleanId = target.replace('#', '');
      setActiveSection(cleanId);
      onNavigate('/');
      setTimeout(() => {
        const elem = document.querySelector(target);
        if (elem) {
          const headerOffset = 76;
          const elementPosition = elem.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
      return;
    }

    if (target.startsWith('#')) {
      const cleanId = target.replace('#', '');
      setActiveSection(cleanId);
      const elem = document.querySelector(target);
      if (elem) {
        const headerOffset = 76;
        const elementPosition = elem.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else {
      setActiveSection('');
      onNavigate(target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="content-wrapper header-inner">
        {/* Personal Brand Mark - Clean, Non-Overlapping Monogram */}
        <a 
          href="/" 
          className="brand-mark" 
          onClick={(e) => handleNavClick(e, '/')}
          aria-label="Aakash Thapa Portfolio Home"
        >
          <div className="brand-logo-icon">
            <span className="brand-monogram">AT</span>
            <span className="brand-status-dot" />
          </div>
          <span>Aakash Thapa</span>
        </a>

        {/* Desktop Navigation Links with Smooth Sliding Indicator */}
        <nav aria-label="Main Navigation">
          <ul className="nav-links" ref={navLinksRef}>
            {/* Sliding Active Pill Capsule */}
            <span 
              className="nav-indicator-pill" 
              style={{
                left: `${indicatorStyle.left}px`,
                width: `${indicatorStyle.width}px`,
                opacity: indicatorStyle.opacity,
              }}
              aria-hidden="true"
            />
            <li>
              <a 
                ref={(el) => (itemRefs.current['macpulse'] = el)}
                href="#macpulse" 
                className={`nav-link ${activeSection === 'macpulse' ? 'active' : ''}`} 
                onClick={(e) => handleNavClick(e, '#macpulse')}
              >
                Work
              </a>
            </li>
            <li>
              <a 
                ref={(el) => (itemRefs.current['experience'] = el)}
                href="#experience" 
                className={`nav-link ${activeSection === 'experience' ? 'active' : ''}`} 
                onClick={(e) => handleNavClick(e, '#experience')}
              >
                Experience
              </a>
            </li>
            <li>
              <a 
                ref={(el) => (itemRefs.current['capabilities'] = el)}
                href="#capabilities" 
                className={`nav-link ${activeSection === 'capabilities' ? 'active' : ''}`} 
                onClick={(e) => handleNavClick(e, '#capabilities')}
              >
                Capabilities
              </a>
            </li>
            <li>
              <a 
                ref={(el) => (itemRefs.current['about'] = el)}
                href="#about" 
                className={`nav-link ${activeSection === 'about' ? 'active' : ''}`} 
                onClick={(e) => handleNavClick(e, '#about')}
              >
                About
              </a>
            </li>
            <li>
              <a 
                ref={(el) => (itemRefs.current['contact'] = el)}
                href="#contact" 
                className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`} 
                onClick={(e) => handleNavClick(e, '#contact')}
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>

        {/* Header Actions */}
        <div className="header-actions">
          {/* Resume Button */}
          <button 
            type="button" 
            className="btn-secondary" 
            style={{ padding: '0.45rem 0.95rem', fontSize: '0.85rem' }}
            onClick={onOpenResume}
            aria-label="View and Download Resume"
          >
            <FileText size={15} />
            <span>Resume</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            className="menu-toggle-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div 
        className={`mobile-nav-drawer ${isMobileMenuOpen ? 'open' : ''}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <a 
          href="#macpulse" 
          className={`nav-link ${activeSection === 'macpulse' ? 'active' : ''}`}
          onClick={(e) => handleNavClick(e, '#macpulse')}
        >
          Work (MacPulse)
        </a>
        <a 
          href="#experience" 
          className={`nav-link ${activeSection === 'experience' ? 'active' : ''}`}
          onClick={(e) => handleNavClick(e, '#experience')}
        >
          Experience
        </a>
        <a 
          href="#capabilities" 
          className={`nav-link ${activeSection === 'capabilities' ? 'active' : ''}`}
          onClick={(e) => handleNavClick(e, '#capabilities')}
        >
          Capabilities
        </a>
        <a 
          href="#about" 
          className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
          onClick={(e) => handleNavClick(e, '#about')}
        >
          About
        </a>
        <a 
          href="#contact" 
          className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
          onClick={(e) => handleNavClick(e, '#contact')}
        >
          Contact
        </a>
        <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button 
            type="button" 
            className="btn-primary" 
            onClick={() => { setIsMobileMenuOpen(false); onOpenResume(); }}
          >
            <FileText size={16} />
            <span>View Resume</span>
          </button>
        </div>
      </div>
    </header>
  );
}
