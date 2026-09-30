import React, { Suspense, lazy } from 'react';
import { ArrowRight, Download, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

const RibbonScene = lazy(() => import('./RibbonScene'));

export default function Hero({ onOpenResume, isMotionPaused }) {
  const handleViewMacPulse = (e) => {
    e.preventDefault();
    const elem = document.getElementById('macpulse');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section" id="hero" aria-label="Introduction and Overview">
      <div className="content-wrapper hero-grid">
        {/* Left Column: Text & CTAs */}
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            <span className="hero-badge-text">
              Senior Full-Stack Engineer • <strong>6+ Years Experience</strong>
            </span>
          </div>

          <h1 className="hero-title">
            I build the interface. The engine.{' '}
            <span className="gradient-text">And everything between.</span>
          </h1>

          <p className="hero-description">
            {personalInfo.introduction}
          </p>

          <div className="hero-meta-strip">
            <div className="meta-item">
              <span className="meta-label">Location</span>
              <span className="meta-val">Lubbock, TX</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Education</span>
              <span className="meta-val">Texas Tech University (MSCS '27)</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Focus Area</span>
              <span className="meta-val">Software and AI Engineering</span>
            </div>
          </div>

          <div className="hero-actions">
            <a 
              href="#macpulse" 
              className="btn-primary" 
              onClick={handleViewMacPulse}
              id="hero-cta-macpulse"
            >
              <span>View MacPulse</span>
              <ArrowRight size={17} />
            </a>

            <button 
              type="button" 
              className="btn-secondary" 
              onClick={onOpenResume}
              id="hero-cta-resume"
              aria-label="Download and inspect Aakash Thapa resume"
            >
              <Download size={16} />
              <span>Download Resume</span>
            </button>
          </div>

          <div className="hero-interactive-note">
            <Sparkles size={14} color="#7FB5FF" />
            <span>Interactive MacPulse Telemetry • Simulates real-time daemon events</span>
          </div>
        </div>

        {/* Right Column: Custom 3D Sculpture */}
        <div className="hero-scene-column">
          <Suspense fallback={
            <div className="hero-scene-container" aria-label="Loading MacPulse Telemetry">
              <div className="ribbon-canvas-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <svg className="fallback-svg" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="120" cy="120" r="28" stroke="#7FB5FF" strokeWidth="3" opacity="0.8" />
                    <circle cx="120" cy="120" r="10" fill="#3B82F6" />
                    <circle cx="55" cy="70" r="12" fill="#10B981" opacity="0.8" />
                    <circle cx="185" cy="80" r="12" fill="#7FB5FF" opacity="0.8" />
                    <circle cx="120" cy="190" r="12" fill="#60A5FA" opacity="0.8" />
                  </svg>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.75rem' }}>
                    Initializing MacPulse 3D...
                  </div>
                </div>
              </div>
            </div>
          }>
            <RibbonScene 
              isMotionPaused={isMotionPaused} 
            />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
