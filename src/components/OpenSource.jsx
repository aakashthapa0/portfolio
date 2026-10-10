import React from 'react';
import { GitPullRequest, ExternalLink, CheckCircle2, Code2 } from 'lucide-react';
import { GithubIcon } from './Icons';
import { openSourceData } from '../data/portfolioData';

export default function OpenSource() {
  return (
    <section className="opensource-section" id="opensource" aria-label="Open Source Contributions">
      <div className="content-wrapper">
        <div className="section-header">
          <div className="section-label">
            <Code2 size={15} />
            <span>Community Contributions</span>
          </div>
          <h2 className="section-title">Open Source</h2>
          <p className="section-subtitle">
            Real fixes in real codebases. Each contribution below was reviewed and merged upstream.
          </p>
        </div>

        <div className="opensource-grid">
          {openSourceData.map((item, idx) => (
            <article key={idx} className="opensource-card">
              <div className="opensource-top">
                <div className="opensource-icon-wrap">
                  <GitPullRequest size={22} />
                </div>
                <span className="opensource-status">
                  <CheckCircle2 size={14} />
                  {item.status}
                </span>
              </div>
              <div className="opensource-org">
                {item.project} <span aria-hidden="true">·</span> {item.org} <span aria-hidden="true">·</span> {item.date}
              </div>
              <h3 className="opensource-title">{item.title}</h3>
              <p className="opensource-desc">{item.description}</p>
              <div className="opensource-stats">
                {item.stats.map((stat, sIdx) => (
                  <span key={sIdx} className="opensource-stat">{stat}</span>
                ))}
              </div>
              <div className="capability-tags">
                {item.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="tech-tag">{tag}</span>
                ))}
              </div>
              <div className="opensource-links">
                <a href={item.prUrl} target="_blank" rel="noopener noreferrer" className="opensource-link">
                  <ExternalLink size={15} />
                  <span>View Pull Request</span>
                </a>
                <a href={item.repoUrl} target="_blank" rel="noopener noreferrer" className="opensource-link opensource-link-secondary">
                  <GithubIcon size={15} />
                  <span>Repository</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
