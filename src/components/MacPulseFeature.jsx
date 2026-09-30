import React, { useState, useEffect, useRef } from 'react';
import { 
  HardDrive, 
  Activity, 
  AlertTriangle, 
  RotateCcw, 
  Play, 
  FileCode, 
  ExternalLink, 
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Server
} from 'lucide-react';
import { macPulseData } from '../data/portfolioData';

export default function MacPulseFeature({ onNavigateToCaseStudy }) {
  const [selectedDeviceId, setSelectedDeviceId] = useState('device-m1-ultra');
  const [simulationState, setSimulationState] = useState('idle'); // 'idle' | 'running' | 'alert_triggered'
  const [simulationProgress, setSimulationProgress] = useState(0); // 0 to 100
  const [showExplanation, setShowExplanation] = useState(false);
  const [trendData, setTrendData] = useState([18, 22, 19, 24, 21, 28, 25, 22, 26, 24]);
  
  // Track dynamic simulated storage delta
  const [dynamicAddedGB, setDynamicAddedGB] = useState(0);
  const [dynamicWriteRate, setDynamicWriteRate] = useState(null);

  const simulationTimerRef = useRef(null);

  const selectedDevice = macPulseData.sampleFleetDevices.find(
    (d) => d.id === selectedDeviceId
  ) || macPulseData.sampleFleetDevices[0];

  // Reset simulation whenever user switches devices or clicks Reset
  const handleReset = () => {
    if (simulationTimerRef.current) {
      clearInterval(simulationTimerRef.current);
    }
    setSimulationState('idle');
    setSimulationProgress(0);
    setShowExplanation(false);
    setDynamicAddedGB(0);
    setDynamicWriteRate(null);
    setTrendData([18, 22, 19, 24, 21, 28, 25, 22, 26, 24]);
  };

  const handleDeviceSelect = (id) => {
    if (simulationState === 'running') {
      // Don't switch mid-scenario to avoid race conditions
      return;
    }
    handleReset();
    setSelectedDeviceId(id);
  };

  // Run deterministic storage spike simulation
  const handleSimulateSpike = () => {
    if (simulationState === 'running') return;
    handleReset();
    setSimulationState('running');

    let step = 0;
    const totalSteps = 12;
    const baseRate = selectedDevice.baselineWriteMBs;
    const spikeRate = selectedDevice.anomalyScenario.spikeWriteMBs;
    const targetDeltaGB = selectedDevice.anomalyScenario.spikeDeltaGB;

    simulationTimerRef.current = setInterval(() => {
      step += 1;
      const progressRatio = step / totalSteps;
      setSimulationProgress(Math.round(progressRatio * 100));

      // Calculate dynamic write speed surging
      const currentRate = Math.round(baseRate + (spikeRate - baseRate) * Math.min(progressRatio * 1.3, 1.0));
      setDynamicWriteRate(currentRate);

      // Dynamic storage fill
      const addedGB = +(targetDeltaGB * progressRatio).toFixed(1);
      setDynamicAddedGB(addedGB);

      // Update sparkline trend
      setTrendData((prev) => {
        const next = [...prev.slice(1)];
        next.push(Math.min(Math.round(currentRate / 7), 100));
        return next;
      });

      if (step >= totalSteps) {
        clearInterval(simulationTimerRef.current);
        setSimulationState('alert_triggered');
        setShowExplanation(true);
      }
    }, 280);
  };

  useEffect(() => {
    return () => {
      if (simulationTimerRef.current) clearInterval(simulationTimerRef.current);
    };
  }, []);

  // Compute live storage metrics
  const currentUsedGB = selectedDevice.baselineStorage.usedGB + dynamicAddedGB;
  const currentTotalGB = selectedDevice.baselineStorage.totalGB;
  const usedPercentage = Math.min(Math.round((currentUsedGB / currentTotalGB) * 100), 100);
  const displayWriteRate = dynamicWriteRate !== null ? dynamicWriteRate : selectedDevice.baselineWriteMBs;

  return (
    <section className="macpulse-section" id="macpulse" aria-label="MacPulse Featured Project">
      <div className="content-wrapper">
        <div className="section-header">
          <div className="section-label">
            <Activity size={15} />
            <span>Featured Engineering Project</span>
          </div>
          <h2 className="section-title">
            MacPulse: macOS Storage & System Fleet Observability
          </h2>
          <p className="section-subtitle">
            A production-ready observability platform architected for Apple Silicon and macOS fleets. 
            Combines native daemons, an asynchronous FastAPI coordinator, and deterministic telemetry diagnosis.
          </p>
        </div>

        {/* MacPulse Showcase Card */}
        <div className="glass-panel macpulse-hero-card">
          <div className="macpulse-header-row">
            <div className="macpulse-title-group">
              <h3>{macPulseData.title}</h3>
              <p className="macpulse-tagline">{macPulseData.tagline}</p>
            </div>
            
            <div className="macpulse-actions">
              <button
                type="button"
                className="btn-primary"
                onClick={() => onNavigateToCaseStudy()}
                aria-label="Read full MacPulse technical case study"
              >
                <span>Read Case Study</span>
                <ArrowRight size={16} />
              </button>
              
              <a
                href={macPulseData.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                aria-label="View MacPulse GitHub repository"
              >
                <FileCode size={16} />
                <span>GitHub Source</span>
                <ExternalLink size={14} style={{ opacity: 0.7 }} />
              </a>
            </div>
          </div>

          <p className="macpulse-summary">
            {macPulseData.summary}
          </p>

          {/* Architecture Stack Badges */}
          <div className="architecture-pills">
            {macPulseData.architectureStack.map((item, idx) => (
              <div key={idx} className="arch-pill">
                <span className="arch-pill-category">{item.category}</span>
                <span className="arch-pill-tech">{item.tech}</span>
              </div>
            ))}
          </div>

          {/* Key Metrics */}
          <div className="macpulse-metrics-grid">
            {macPulseData.keyMetrics.map((metric, idx) => (
              <div key={idx} className="metric-card">
                <div className="metric-val">{metric.value}</div>
                <div className="metric-lbl">{metric.label}</div>
                <div className="metric-det">{metric.detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Fleet Demonstration Component */}
        <div className="fleet-demo-container" aria-label="Interactive Fleet Demonstration">
          <div className="demo-top-bar">
            <div className="demo-title-group">
              <Server size={18} color="#7FB5FF" />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>
                Live Fleet Observability Simulator
              </h3>
              <span className="sample-data-badge">
                Sample Data • Deterministic Simulation
              </span>
            </div>

            <div className="demo-controls-group">
              <button
                type="button"
                className="btn-simulate"
                onClick={handleSimulateSpike}
                disabled={simulationState === 'running'}
                aria-label="Trigger simulated storage spike anomaly"
              >
                <Play size={14} fill="currentColor" />
                <span>
                  {simulationState === 'running' 
                    ? `Simulating Burst (${simulationProgress}%)...` 
                    : 'Simulate Storage Spike'}
                </span>
              </button>

              <button
                type="button"
                className="btn-reset"
                onClick={handleReset}
                aria-label="Reset simulation to baseline"
              >
                <RotateCcw size={14} />
                <span>Reset Demo</span>
              </button>
            </div>
          </div>

          {/* Device Selection Cards */}
          <div className="device-tabs-row" role="tablist" aria-label="Sample Fleet Devices">
            {macPulseData.sampleFleetDevices.map((device) => {
              const isSelected = device.id === selectedDeviceId;
              const hasAnomaly = isSelected && simulationState === 'alert_triggered';
              return (
                <button
                  key={device.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`device-node-card ${isSelected ? 'selected' : ''} ${hasAnomaly ? 'anomaly' : ''}`}
                  onClick={() => handleDeviceSelect(device.id)}
                  disabled={simulationState === 'running'}
                >
                  <div className="device-node-header">
                    <span className="device-node-name">{device.name}</span>
                    <span className={`status-indicator ${hasAnomaly ? 'anomaly' : 'normal'}`}>
                      {hasAnomaly ? 'Spike Detected' : 'Online / Stable'}
                    </span>
                  </div>
                  <div className="device-node-host">{device.hostname}</div>
                  <div className="device-quick-stats">
                    <span>Role: <strong>{device.role}</strong></span>
                    <span>Write: <strong>{isSelected && dynamicWriteRate ? `${dynamicWriteRate} MB/s` : `${device.baselineWriteMBs} MB/s`}</strong></span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Node Telemetry Monitor */}
          <div className="telemetry-detail-grid">
            {/* Storage & Volume Capacity Meter */}
            <div className="telemetry-card">
              <div className="telemetry-card-header">
                <div className="telemetry-card-title">
                  <HardDrive size={16} color="#7FB5FF" />
                  <span>APFS Volume Container Telemetry</span>
                </div>
                <span className="tech-tag">macOS APFS</span>
              </div>

              <div className="storage-meter-wrapper">
                <div className="storage-labels">
                  <span>Capacity Used: <strong>{currentUsedGB} GB</strong> of {currentTotalGB} GB</span>
                  <span style={{ color: usedPercentage > 85 ? '#EF4444' : '#7FB5FF' }}>
                    {usedPercentage}%
                  </span>
                </div>
                <div className="storage-track">
                  <div 
                    className={`storage-fill ${usedPercentage > 85 ? 'high' : ''}`}
                    style={{ width: `${usedPercentage}%` }} 
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '1rem' }}>
                <div style={{ background: 'var(--bg-surface-glass)', border: '1px solid var(--border-subtle)', padding: '0.75rem', borderRadius: '6px' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Free Headroom</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', fontWeight: 600 }}>
                    {(currentTotalGB - currentUsedGB).toFixed(1)} GB
                  </div>
                </div>
                <div style={{ background: 'var(--bg-surface-glass)', border: '1px solid var(--border-subtle)', padding: '0.75rem', borderRadius: '6px' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Write Ingestion Rate</div>
                  <div style={{ 
                    fontFamily: 'var(--font-mono)', 
                    fontSize: '1.1rem', 
                    fontWeight: 600,
                    color: displayWriteRate > 100 ? '#EF4444' : '#F3F1EB'
                  }}>
                    {displayWriteRate} MB/s
                  </div>
                </div>
              </div>
            </div>

            {/* Real-time I/O Velocity & Alert Detection */}
            <div className="telemetry-card">
              <div className="telemetry-card-header">
                <div className="telemetry-card-title">
                  <Activity size={16} color="#7FB5FF" />
                  <span>I/O Write Velocity Sliding Window</span>
                </div>
                <span className="tech-tag">1,000ms Polling</span>
              </div>

              <div className="sparkline-container" aria-label="Real-time write velocity trend sparkline">
                {trendData.map((val, i) => (
                  <div 
                    key={i} 
                    className={`spark-bar ${val > 40 ? 'spike' : ''} ${i === trendData.length - 1 ? 'recent' : ''}`}
                    style={{ height: `${Math.max(val, 6)}%` }}
                    title={`Tick ${i}: ${val * 7} MB/s`}
                  />
                ))}
              </div>

              {simulationState === 'alert_triggered' ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#EF4444' }}>
                  <AlertTriangle size={18} />
                  <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                    ALERT TRIGGERED: {selectedDevice.anomalyScenario.alertType}
                  </span>
                </div>
              ) : simulationState === 'running' ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#F59E0B' }}>
                  <Activity size={16} className="animate-spin" />
                  <span style={{ fontSize: '0.85rem' }}>
                    Streaming write activity bursts to coordinator...
                  </span>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#10B981' }}>
                  <CheckCircle2 size={16} />
                  <span style={{ fontSize: '0.85rem' }}>
                    Telemetry within nominal baseline limits
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Telemetry-Grounded AI Root Cause Card */}
          {showExplanation && (
            <div className={`ai-diagnosis-box ${simulationState === 'alert_triggered' ? 'anomaly' : ''}`}>
              <div className="ai-header">
                <div className="ai-header-left">
                  <Sparkles size={16} />
                  <span>Telemetry-Grounded Gemini AI Explanation</span>
                </div>
                <span className="ai-prewritten-tag">Prewritten Sample Diagnosis</span>
              </div>

              <p className="ai-explanation-text">
                {selectedDevice.anomalyScenario.explanation}
              </p>

              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#A8D1FF', marginBottom: '0.4rem' }}>
                Actionable Remediation Commands:
              </div>
              <ul className="ai-recommendations-list">
                {selectedDevice.anomalyScenario.recommendations.map((rec, idx) => (
                  <li key={idx}><code>{rec}</code></li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
