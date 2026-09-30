import React from 'react';
import { User, GraduationCap, Compass, ShieldCheck } from 'lucide-react';
import { aboutData } from '../data/portfolioData';

export default function About() {
  return (
    <section className="about-section" id="about" aria-label="About and Education">
      <div className="content-wrapper">
        <div className="section-header">
          <div className="section-label">
            <User size={15} />
            <span>Background & Philosophy</span>
          </div>
          <h2 className="section-title">About Aakash</h2>
          <p className="section-subtitle">
            Crafting software from the metal to the browser with a relentless dedication to systems reliability, intuitive interfaces, and verifiable performance.
          </p>
        </div>

        <div className="about-grid">
          {/* Left Column: Biography & Principles */}
          <div className="about-left">
            <div className="about-bio">
              {aboutData.biography.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            <div style={{ marginTop: '2.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Compass size={18} color="#7FB5FF" />
                <span>Core Engineering Principles</span>
              </h3>
              <div className="principles-list">
                {aboutData.principles.map((pr, pIdx) => (
                  <div key={pIdx} className="principle-item">
                    <div className="principle-title">{pr.title}</div>
                    <div className="principle-desc">{pr.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Education & Academic Rigor */}
          <div className="about-right">
            {aboutData.education.map((edu, idx) => (
              <div key={idx} className="education-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#7FB5FF', marginBottom: '0.5rem' }}>
                  <GraduationCap size={20} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {edu.level}
                  </span>
                </div>
                <h3 className="education-degree" style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>{edu.degree}</h3>
                <div className="education-institution" style={{ fontSize: '0.95rem' }}>{edu.institution}</div>
                <div className="education-meta" style={{ marginBottom: '0.5rem' }}>
                  <span>{edu.location}</span> • <span>{edu.duration}</span>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  {edu.details}
                </p>
              </div>
            ))}

            <div className="glass-panel" style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#10B981', marginBottom: '0.75rem' }}>
                <ShieldCheck size={20} />
                <h4 style={{ fontSize: '1rem', color: '#F3F1EB' }}>Current Availability</h4>
              </div>
              <p style={{ fontSize: '0.925rem', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                Currently based in Lubbock, Texas. Open to impactful engineering roles, technical collaboration, and distributed systems discussions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
