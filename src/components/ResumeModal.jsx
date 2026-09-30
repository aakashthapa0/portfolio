import React, { useEffect } from 'react';
import { X, Download, Mail, Phone, MapPin } from 'lucide-react';
import { resumeData } from '../data/resumeData';

export default function ResumeModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="modal-backdrop" 
      onClick={onClose} 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="resume-modal-title"
    >
      <div 
        className="modal-container" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '900px' }}
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-wrap">
            <h3 id="resume-modal-title" style={{ fontSize: '1.15rem', fontWeight: 700 }}>
              {resumeData.name}
            </h3>
            <span className="tech-tag" style={{ marginLeft: '0.5rem' }}>Official Resume</span>
          </div>

          <div className="modal-actions">
            {/* Direct PDF Download */}
            <a
              href={resumeData.directPdfUrl}
              download="Aakash_Thapa_Resume.pdf"
              className="btn-primary"
              style={{ padding: '0.45rem 1.15rem', fontSize: '0.85rem' }}
              title="Download official PDF resume"
              aria-label="Download official PDF resume"
            >
              <Download size={15} />
              <span>Download PDF</span>
            </a>

            {/* Close Button */}
            <button
              type="button"
              className="btn-ghost"
              onClick={onClose}
              aria-label="Close resume preview"
              style={{ padding: '0.4rem' }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Body: Exact Resume Content */}
        <div className="modal-body">
          {/* Header Info */}
          <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1.25rem', marginBottom: '1.5rem', textAlign: 'center' }}>
            <h1 style={{ fontSize: '2.1rem', fontWeight: 800, marginBottom: '0.35rem', letterSpacing: '-0.02em' }}>
              {resumeData.name}
            </h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              <span><MapPin size={14} style={{ display: 'inline', verticalAlign: '-2px' }} /> {resumeData.location}</span>
              <span>•</span>
              <a href={`mailto:${resumeData.email}`} style={{ color: 'var(--text-accent)' }}>
                <Mail size={14} style={{ display: 'inline', verticalAlign: '-2px' }} /> {resumeData.email}
              </a>
              <span>•</span>
              <span><Phone size={14} style={{ display: 'inline', verticalAlign: '-2px' }} /> {resumeData.phone}</span>
              <span>•</span>
              <a href={resumeData.linkedin} target="_blank" rel="noreferrer" style={{ color: 'var(--text-accent)', textDecoration: 'underline' }}>
                LinkedIn
              </a>
              <span>•</span>
              <a href={resumeData.github} target="_blank" rel="noreferrer" style={{ color: 'var(--text-accent)', textDecoration: 'underline' }}>
                GitHub
              </a>
            </div>
          </div>

          {/* Summary */}
          <section style={{ marginBottom: '1.75rem' }}>
            <h3 style={{ fontSize: '1rem', color: 'var(--text-accent)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
              Summary
            </h3>
            <p style={{ fontSize: '0.925rem', lineHeight: '1.65', color: 'var(--text-secondary)' }}>
              {resumeData.summary}
            </p>
          </section>

          {/* Education */}
          <section style={{ marginBottom: '1.75rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
            <h3 style={{ fontSize: '1rem', color: 'var(--text-accent)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
              Education
            </h3>
            {resumeData.education.map((edu, idx) => (
              <div key={idx} style={{ marginBottom: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontWeight: 700, color: 'var(--text-primary)' }}>
                  <span style={{ fontSize: '0.95rem' }}>{edu.institution}, {edu.degree}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.825rem', color: 'var(--text-accent)' }}>{edu.dates}</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                  {edu.details} — {edu.location}
                </div>
              </div>
            ))}
          </section>

          {/* Experience */}
          <section style={{ marginBottom: '1.75rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
            <h3 style={{ fontSize: '1rem', color: 'var(--text-accent)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
              Experience
            </h3>
            {resumeData.experience.map((exp, idx) => (
              <div key={idx} style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '1rem' }}>{exp.role}, {exp.company} – {exp.location}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.825rem', color: 'var(--text-accent)', whiteSpace: 'nowrap' }}>{exp.period}</span>
                </div>
                <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.885rem', color: 'var(--text-secondary)', lineHeight: '1.55' }}>
                  {exp.bullets.map((b, bIdx) => (
                    <li key={bIdx}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* Featured Projects */}
          {resumeData.featuredProjects && resumeData.featuredProjects.length > 0 && (
            <section style={{ marginBottom: '1.75rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
              <h3 style={{ fontSize: '1rem', color: 'var(--text-accent)', marginBottom: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                Featured Engineering Projects
              </h3>
              {resumeData.featuredProjects.map((proj, idx) => (
                <div key={idx} style={{ marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '1rem' }}>{proj.name} — {proj.role}</span>
                    {proj.github && (
                      <a href={proj.github} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.8rem', color: 'var(--text-accent)', textDecoration: 'underline' }}>
                        GitHub Repo
                      </a>
                    )}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-accent)', marginBottom: '0.45rem' }}>
                    Stack: {proj.stack}
                  </div>
                  <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.885rem', color: 'var(--text-secondary)', lineHeight: '1.55' }}>
                    {proj.highlights.map((h, hIdx) => (
                      <li key={hIdx}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          )}

          {/* Technologies */}
          <section style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem' }}>
            <h3 style={{ fontSize: '1rem', color: 'var(--text-accent)', marginBottom: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
              Technologies
            </h3>
            <div className="resume-tech-grid">
              {resumeData.technologies.map((tech, idx) => (
                <div key={idx} className="resume-tech-row">
                  <strong className="resume-tech-label">{tech.category}:</strong>
                  <span className="resume-tech-list">{tech.list}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
