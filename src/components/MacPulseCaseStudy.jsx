import React from 'react';
import { 
  ArrowLeft, 
  ExternalLink, 
  Layers, 
  Cpu, 
  HardDrive, 
  Sparkles,
  Server,
  Zap
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { macPulseData } from '../data/portfolioData';

export default function MacPulseCaseStudy({ onBackToHome }) {
  return (
    <article className="case-study-page" aria-label="MacPulse In-Depth Case Study">
      <div className="content-wrapper">
        {/* Navigation Back */}
        <div className="case-study-header">
          <button 
            type="button" 
            className="back-link btn-ghost" 
            onClick={onBackToHome}
            aria-label="Return to portfolio homepage"
          >
            <ArrowLeft size={16} />
            <span>Back to Overview</span>
          </button>

          <span className="section-label" style={{ marginTop: '1rem', display: 'flex' }}>
            Technical Architecture Case Study
          </span>
          <h1 className="case-study-title">
            MacPulse: Engineering Low-Overhead macOS Fleet Observability
          </h1>
          <p className="case-study-lead">
            An in-depth retrospective on architecting an event-driven system monitor for Apple Silicon and macOS, 
            combining background daemons, asynchronous streaming, and telemetry-grounded AI diagnostics.
          </p>

          <div className="case-study-meta-grid">
            <div className="case-study-meta-item glass-panel">
              <div className="meta-label">Role & Ownership</div>
              <div className="meta-val">Sole Creator & Full-Stack Architect</div>
            </div>
            <div className="case-study-meta-item glass-panel">
              <div className="meta-label">Technologies</div>
              <div className="meta-val">FastAPI, Python, React 19, launchd, SSE, SQLite</div>
            </div>
            <div className="case-study-meta-item glass-panel">
              <div className="meta-label">Observability Focus</div>
              <div className="meta-val">APFS Storage Velocity & Daemon Anomalies</div>
            </div>
            <div className="case-study-meta-item glass-panel">
              <div className="meta-label">Source Code</div>
              <a 
                href={macPulseData.repoUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="meta-val" 
                style={{ color: 'var(--text-accent)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
              >
                <span>GitHub Repository</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* 1. Problem & Intended Users */}
        <section className="case-section">
          <h2>1. The Problem: Invisible Disk Bloat in Modern Dev Environments</h2>
          <p>
            Software engineers and development teams operating on macOS frequently face inexplicable disk space exhaustion. 
            Unlike traditional servers where partitions are strictly segregated, macOS consolidates storage under Apple File System (APFS) 
            container sharing. 
          </p>
          <p>
            A background Docker build loop, unpurged Xcode DerivedData caches, or orphaned APFS local Time Machine snapshots can consume 
            60+ gigabytes in minutes. Standard disk utility GUIs are retrospective and heavy: they scan static directory trees after the disk is full, 
            causing intense disk thrashing while failing to identify <em>which</em> process or daemon drove the sudden velocity surge.
          </p>
          
          <div className="glass-panel case-study-highlight-card" style={{ padding: '1.5rem', marginTop: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.45rem' }}>
              <Zap size={18} color="#7FB5FF" />
              <strong style={{ color: 'var(--text-primary)', fontSize: '1rem' }}>MacPulse Core Mission</strong>
            </div>
            <p style={{ margin: 0, fontSize: '0.925rem', color: 'var(--text-secondary)' }}>
              Transforming storage monitoring from static post-mortem disk scans into continuous, real-time telemetry streaming that flags write velocity surges the moment they initiate.
            </p>
          </div>
        </section>

        {/* 2. System Architecture */}
        <section className="case-section">
          <h2>2. End-to-End System Architecture</h2>
          <p>
            The system employs a decoupled, multi-tiered architecture designed for minimal CPU footprint (&lt;0.5% idle utilization) 
            and zero external cloud dependencies for monitoring functions.
          </p>

          {/* Interactive Architecture Flow Diagram */}
          <div className="interactive-arch-diagram" aria-label="MacPulse System Architecture Diagram">
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Layers size={18} color="#7FB5FF" />
              <span>MacPulse Pipeline Flow</span>
            </h3>

            <div className="arch-flow-row">
              <div className="arch-flow-node glass-panel">
                <Cpu size={24} color="#7FB5FF" style={{ margin: '0 auto 0.5rem' }} />
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>macOS Daemon Agent</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  Managed via <code>launchd</code> • Resident memory &lt;28MB • Samples APFS volume stats, write IOPS, and process attribution.
                </div>
              </div>

              <div className="arch-flow-arrow">➔</div>

              <div className="arch-flow-node glass-panel">
                <Server size={24} color="#60A5FA" style={{ margin: '0 auto 0.5rem' }} />
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>FastAPI Coordinator</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  Asynchronous Python 3.11 • Sliding-window anomaly detection • SQLite in Write-Ahead Logging (WAL) mode.
                </div>
              </div>

              <div className="arch-flow-arrow">➔</div>

              <div className="arch-flow-node glass-panel">
                <Zap size={24} color="#10B981" style={{ margin: '0 auto 0.5rem' }} />
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>SSE Streaming Layer</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  Server-Sent Events over HTTP/2 • Pushes sub-50ms delta metrics to subscribed frontends without polling.
                </div>
              </div>

              <div className="arch-flow-arrow">➔</div>

              <div className="arch-flow-node glass-panel">
                <HardDrive size={24} color="#A8D1FF" style={{ margin: '0 auto 0.5rem' }} />
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>React Dashboard</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  React 19 + Canvas sparklines • Instant device switching, storage meters, and anomaly banner alerting.
                </div>
              </div>
            </div>

            {/* AI Diagnostics Branch */}
            <div className="ai-diagnostics-card glass-panel" style={{ marginTop: '2rem', padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.45rem' }}>
                <Sparkles size={18} color="#7FB5FF" />
                <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                  Separated AI Diagnostics Pathway (Gemini API)
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
                Crucially, the Gemini AI analysis service is strictly isolated from observability pipelines. Raw file contents are <em>never</em> read or transmitted. 
                When an anomaly triggers, only anonymized metadata (write velocity, path root, timestamp, and duration) is sent to formulate targeted root-cause suggestions.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Key Decisions & Tradeoffs */}
        <section className="case-section">
          <h2>3. Key Architectural Decisions & Tradeoffs</h2>

          <div className="case-study-cards-grid">
            <div className="glass-panel" style={{ padding: '1.75rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--text-accent)', marginBottom: '0.65rem' }}>
                SQLite WAL vs. External Database
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                <strong>Decision:</strong> Adopted embedded SQLite in Write-Ahead Logging (WAL) mode for coordinator state.
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                <strong>Tradeoff:</strong> While PostgreSQL offers multi-node distributed clustering, SQLite WAL eliminates Docker/daemon dependencies on the host, achieving 15,000+ sequential write metrics/sec with single-digit millisecond read latencies and zero setup friction.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '1.75rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--text-accent)', marginBottom: '0.65rem' }}>
                Server-Sent Events (SSE) vs. WebSockets
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                <strong>Decision:</strong> Used HTTP Server-Sent Events (SSE) for metrics transport to the dashboard.
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                <strong>Tradeoff:</strong> Metric streaming is inherently unidirectional (coordinator to browser). SSE works natively over HTTP/2, traverses standard proxies without custom handshake upgrades, and provides built-in browser reconnection logic with negligible overhead.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '1.75rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--text-accent)', marginBottom: '0.65rem' }}>
                launchd Service Management vs. cron
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                <strong>Decision:</strong> Packaged the client daemon as a native macOS LaunchDaemon property list (plist).
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                <strong>Tradeoff:</strong> Unlike cron or detached background scripts, launchd integrates with macOS Mach IPC, respects operating system throttling during low-battery states, and guarantees instantaneous respawn on unexpected exits.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '1.75rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--text-accent)', marginBottom: '0.65rem' }}>
                Metadata-Only Telemetry vs. Full Content Scans
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                <strong>Decision:</strong> Bound daemon inspection exclusively to APFS stat metadata and filesystem event streams.
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                <strong>Tradeoff:</strong> Ensures user privacy by design—no private source code or personal documents are accessed. Additionally avoids saturating disk I/O caches with heavy recursive reads.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Limitations & Future Roadmap */}
        <section className="case-section">
          <h2>4. Technical Limitations & Future Engineering Roadmap</h2>
          <div className="case-study-cards-grid">
            <div className="glass-panel roadmap-card" style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--accent-blue)', fontWeight: 600, fontSize: '0.8rem' }}>
                  <Zap size={15} />
                  <span>Performance Optimization</span>
                </div>
                <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.55rem', background: 'var(--accent-glow-subtle)', color: 'var(--text-accent)', borderRadius: '12px', border: '1px solid var(--border-medium)' }}>
                  In Progress
                </span>
              </div>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                APFS Snapshot Diffing Latency
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                Inspecting local APFS snapshot sizes currently relies on <code>tmutil</code> CLI wrappers, which introduce a 1.2-second latency penalty. Transitioning to direct private Apple Storage / DiskArbitration C-bindings will reduce this to microseconds.
              </p>
            </div>

            <div className="glass-panel roadmap-card" style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#10B981', fontWeight: 600, fontSize: '0.8rem' }}>
                  <Cpu size={15} />
                  <span>Cross-Platform Expansion</span>
                </div>
                <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.55rem', background: 'rgba(16, 185, 129, 0.12)', color: '#10B981', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
                  Architecture
                </span>
              </div>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                eBPF Kernel Probes for Linux
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                Porting the agent daemon to Linux systems using eBPF kernel probes for unified hybrid cloud and local workstation observability without root kernel module risks.
              </p>
            </div>

            <div className="glass-panel roadmap-card" style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#60A5FA', fontWeight: 600, fontSize: '0.8rem' }}>
                  <Server size={15} />
                  <span>High Availability</span>
                </div>
                <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.55rem', background: 'rgba(96, 165, 250, 0.12)', color: '#60A5FA', borderRadius: '12px', border: '1px solid rgba(96, 165, 250, 0.25)' }}>
                  Planned
                </span>
              </div>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                Multi-Coordinator Raft Consensus
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                For large fleets (&gt;50 nodes), replacing single-coordinator SQLite with lightweight Raft consensus to support seamless active-passive failover and cross-node replication.
              </p>
            </div>
          </div>
        </section>

        {/* 5. Source Code & Links */}
        <section className="case-section" style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '2.5rem' }}>
          <h2>5. Source Code & Verification</h2>
          <div className="glass-panel" style={{ padding: '2rem', marginTop: '1.5rem' }}>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              The entire codebase, agent daemons, FastAPI schemas, and React telemetry interfaces are open for review on GitHub:
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a 
                href={macPulseData.repoUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-primary"
              >
                <GithubIcon size={18} />
                <span>Explore GitHub Repository</span>
                <ExternalLink size={15} />
              </a>

              <button 
                type="button" 
                className="btn-secondary" 
                onClick={onBackToHome}
              >
                <ArrowLeft size={16} />
                <span>Return to Portfolio</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
