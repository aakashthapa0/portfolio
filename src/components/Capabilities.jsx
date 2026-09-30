import React from 'react';
import { Layers, Globe, Database, Cloud, Cpu } from 'lucide-react';
import { capabilitiesData } from '../data/portfolioData';

const capabilityIcons = {
  "Web & Mobile Systems": Globe,
  "Backend & Data Engineering": Database,
  "Cloud, Systems & Reliability": Cloud,
  "Applied AI & LLM Systems": Cpu,
};

export default function Capabilities() {
  return (
    <section className="capabilities-section" id="capabilities" aria-label="Technical Capabilities">
      <div className="content-wrapper">
        <div className="section-header">
          <div className="section-label">
            <Layers size={15} />
            <span>Core Competencies</span>
          </div>
          <h2 className="section-title">Technical Capabilities</h2>
          <p className="section-subtitle">
            Comprehensive full-stack engineering expertise spanning fluid user interfaces, high-throughput distributed backends, cloud infrastructure, and grounded AI models.
          </p>
        </div>

        <div className="capabilities-grid">
          {capabilitiesData.map((cap, idx) => {
            const IconComponent = capabilityIcons[cap.category] || Layers;
            return (
              <div key={idx} className="capability-card">
                <div className="capability-icon-wrap">
                  <IconComponent size={22} />
                </div>
                <h3 className="capability-title">{cap.category}</h3>
                <p className="capability-desc">{cap.description}</p>
                <div className="capability-tags">
                  {cap.technologies.map((tech, tIdx) => (
                    <span key={tIdx} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
