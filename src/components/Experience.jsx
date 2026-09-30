import React from 'react';
import { Briefcase } from 'lucide-react';
import { experienceData } from '../data/portfolioData';

export default function Experience() {
  return (
    <section className="experience-section" id="experience" aria-label="Professional Experience">
      <div className="content-wrapper">
        <div className="section-header">
          <div className="section-label">
            <Briefcase size={15} />
            <span>Employment History</span>
          </div>
          <h2 className="section-title">Professional Experience</h2>
          <p className="section-subtitle">
            6+ years architecting web applications, cross-platform mobile systems, and scalable backend platforms across high-growth startups and established tech firms.
          </p>
        </div>

        <div className="timeline-wrapper">
          {experienceData.map((exp, index) => (
            <article key={index} className="timeline-item">
              <div className="timeline-header">
                <h3 className="timeline-role">{exp.role}</h3>
                <span className="timeline-period">{exp.period}</span>
              </div>

              <div className="timeline-company-row">
                <span>{exp.company}</span>
                <span className="timeline-location">• {exp.location}</span>
              </div>

              <ul className="timeline-bullets">
                {exp.highlights.map((bullet, bIdx) => (
                  <li key={bIdx}>{bullet}</li>
                ))}
              </ul>

              <div className="timeline-tech-tags">
                {exp.techStack.map((tech, tIdx) => (
                  <span key={tIdx} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
