import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Zap } from 'lucide-react';
import { derivePalette, getStoredTheme } from '../utils/themeEngine';

/**
 * RibbonScene: MacPulse Live Telemetry Core & Daemon Architecture
 * 
 * Replaces the abstract monogram ribbon with a concrete, meaningful 3D visualization
 * of Aakash's featured system: MacPulse.
 * - Central Coordinator Engine (High-throughput FastAPI coordinator)
 * - 3 Connected macOS Daemon Edge Nodes (MacBook Pro Dev, Mac Studio CI, MacBook Air Staging)
 * - Real-time continuous luminous data streams and travelling telemetry packets
 * - "Send Telemetry Pulse" triggers an interactive high-velocity I/O write burst
 * - Responds smoothly to pointer tilt, scroll unfolding, and motion pause
 */
export default function RibbonScene({ isMotionPaused }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [webGLFailed] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      return !gl;
    } catch {
      return true;
    }
  });
  const [pulseActive, setPulseActive] = useState(false);

  const sceneContextRef = useRef({
    renderer: null,
    scene: null,
    camera: null,
    frameId: null,
    targetRotation: { x: 0, y: 0 },
    currentRotation: { x: 0, y: 0 },
    scrollProgress: 0,
    isPulsing: false,
    pulseTimer: 0,
    nodes: [],
    pipelines: [],
    packets: [],
    coreGroup: null,
    coreInner: null,
    coreOuter: null,
  });

  const triggerPulse = () => {
    const ctx = sceneContextRef.current;
    ctx.isPulsing = true;
    ctx.pulseTimer = 0;
    setPulseActive(true);
    setTimeout(() => {
      setPulseActive(false);
    }, 1800);
  };

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas || webGLFailed) return;

    const ctx = sceneContextRef.current;
    const width = container.clientWidth || 480;
    const height = container.clientHeight || 420;

    // Scene & Perspective Camera
    const scene = new THREE.Scene();
    ctx.scene = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);
    ctx.camera = camera;

    // Renderer
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      ctx.renderer = renderer;
    } catch {
      return;
    }

    // Studio Illumination
    const initialPalette = derivePalette(getStoredTheme());

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(initialPalette.threePrimary, 2.5);
    keyLight.position.set(5, 5, 6);
    scene.add(keyLight);

    const blueRimLight = new THREE.DirectionalLight(initialPalette.threeSecondary, 2.0);
    blueRimLight.position.set(-6, -4, -3);
    scene.add(blueRimLight);

    // Central Coordinator Pulse Light
    const corePulseLight = new THREE.PointLight(initialPalette.threePrimary, 1.2, 12);
    corePulseLight.position.set(0, 0, 0);
    scene.add(corePulseLight);

    // --------------------------------------------------------------------------
    // 1. Central MacPulse Coordinator Core
    // --------------------------------------------------------------------------
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);
    ctx.coreGroup = coreGroup;

    // Glowing Inner Emissive Nucleus
    const innerGeo = new THREE.IcosahedronGeometry(0.68, 2);
    const innerMat = new THREE.MeshStandardMaterial({
      color: initialPalette.threePrimary,
      emissive: initialPalette.threeSecondary,
      emissiveIntensity: 1.1,
      roughness: 0.1,
      metalness: 0.8,
    });
    const coreInner = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(coreInner);
    ctx.coreInner = coreInner;

    // Outer Precision Metallic Frame
    const outerGeo = new THREE.IcosahedronGeometry(1.05, 0);
    const outerMat = new THREE.MeshStandardMaterial({
      color: 0x1E2734,
      metalness: 0.9,
      roughness: 0.2,
      wireframe: true,
    });
    const coreOuter = new THREE.Mesh(outerGeo, outerMat);
    coreGroup.add(coreOuter);
    ctx.coreOuter = coreOuter;

    // Surrounding Orbital Event Ring
    const ringGeo = new THREE.TorusGeometry(1.5, 0.022, 16, 100);
    const ringMat = new THREE.MeshStandardMaterial({
      color: initialPalette.threePrimary,
      emissive: initialPalette.threeSecondary,
      emissiveIntensity: 0.6,
      transparent: true,
      opacity: 0.75,
    });
    const eventRing = new THREE.Mesh(ringGeo, ringMat);
    eventRing.rotation.x = Math.PI / 3;
    coreGroup.add(eventRing);

    // --------------------------------------------------------------------------
    // 2. Connected macOS Daemon Edge Nodes & Telemetry Pipelines
    // --------------------------------------------------------------------------
    const nodeConfigs = [
      { name: 'MacBook Pro M2 [Dev]', pos: new THREE.Vector3(-2.6, 1.1, 0.3), color: 0x10B981 },
      { name: 'Mac Studio M1 [CI Node]', pos: new THREE.Vector3(2.5, 1.3, -0.2), color: 0x7FB5FF },
      { name: 'MacBook Air M3 [Staging]', pos: new THREE.Vector3(0.2, -2.2, 0.4), color: 0x60A5FA },
    ];

    const nodes = [];
    const pipelines = [];
    const packets = [];

    const nodeBoxGeo = new THREE.BoxGeometry(0.7, 0.45, 0.1);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0x18202A,
      metalness: 0.85,
      roughness: 0.25,
    });

    nodeConfigs.forEach((cfg) => {
      // Node Module Mesh
      const nodeMesh = new THREE.Mesh(nodeBoxGeo, nodeMat);
      nodeMesh.position.copy(cfg.pos);
      scene.add(nodeMesh);

      // Node Status LED
      const ledGeo = new THREE.SphereGeometry(0.06, 12, 12);
      const ledMat = new THREE.MeshBasicMaterial({ color: cfg.color });
      const led = new THREE.Mesh(ledGeo, ledMat);
      led.position.set(0.25, 0.12, 0.07);
      nodeMesh.add(led);

      nodes.push(nodeMesh);

      // Curved Pipeline linking Edge Node to Central Coordinator
      const midPoint = new THREE.Vector3()
        .addVectors(cfg.pos, new THREE.Vector3(0, 0, 0))
        .multiplyScalar(0.5);
      midPoint.z += 0.8; // arc outward toward camera

      const curve = new THREE.QuadraticBezierCurve3(cfg.pos, midPoint, new THREE.Vector3(0, 0, 0));
      const tubeGeo = new THREE.TubeGeometry(curve, 40, 0.024, 8, false);
      const tubeMat = new THREE.MeshStandardMaterial({
        color: 0x2A384A,
        emissive: initialPalette.threeSecondary,
        emissiveIntensity: 0.45,
        transparent: true,
        opacity: 0.65,
      });
      const tube = new THREE.Mesh(tubeGeo, tubeMat);
      scene.add(tube);

      pipelines.push({ curve, tube, material: tubeMat });

      // Telemetry Packet Bead travelling on curve
      const packetGeo = new THREE.SphereGeometry(0.09, 12, 12);
      const packetMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
      const packet = new THREE.Mesh(packetGeo, packetMat);
      scene.add(packet);

      packets.push({ mesh: packet, curve, progress: Math.random() });
    });

    ctx.nodes = nodes;
    ctx.pipelines = pipelines;
    ctx.packets = packets;

    // Real-time theme change listener for Three.js lights and materials
    const handleThemeChange = (e) => {
      const p = e.detail;
      if (!p) return;
      if (keyLight) keyLight.color.setHex(p.threePrimary);
      if (blueRimLight) blueRimLight.color.setHex(p.threeSecondary);
      if (corePulseLight) corePulseLight.color.setHex(p.threePrimary);
      if (innerMat) {
        innerMat.color.setHex(p.threePrimary);
        innerMat.emissive.setHex(p.threeSecondary);
      }
      if (ringMat) {
        ringMat.color.setHex(p.threePrimary);
        ringMat.emissive.setHex(p.threeSecondary);
      }
      pipelines.forEach((pipe) => {
        if (pipe.material) {
          pipe.material.emissive.setHex(p.threeSecondary);
        }
      });
    };
    window.addEventListener('portfolio-theme-change', handleThemeChange);

    // Mouse Tracking
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      ctx.targetRotation.y = x * 0.12;
      ctx.targetRotation.x = -y * 0.09;
    };

    const handleMouseLeave = () => {
      ctx.targetRotation.y = 0;
      ctx.targetRotation.x = 0;
    };

    // IntersectionObserver to pause WebGL render loop when hero is off-screen (saving 100% GPU/CPU)
    let isVisible = true;
    let observer = null;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(([entry]) => {
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;
        if (!wasVisible && isVisible) {
          if (!ctx.frameId) {
            ctx.frameId = requestAnimationFrame(animate);
          }
        }
      }, { threshold: 0.05 });
      observer.observe(container);
    }

    // Scroll mapping
    const handleScroll = () => {
      if (!isVisible) return;
      const scrollY = window.scrollY;
      const maxScroll = window.innerHeight * 1.5;
      ctx.scrollProgress = Math.min(scrollY / maxScroll, 1.0);
    };

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Animation Loop
    let clock = 0;
    const animate = () => {
      if (!isVisible) {
        ctx.frameId = null;
        return; // Halt render loop when off-screen
      }

      ctx.frameId = requestAnimationFrame(animate);

      if (isMotionPaused) {
        renderer.render(scene, camera);
        return;
      }

      clock += 0.016;

      // Mouse Lerp
      ctx.currentRotation.x += (ctx.targetRotation.x - ctx.currentRotation.x) * 0.06;
      ctx.currentRotation.y += (ctx.targetRotation.y - ctx.currentRotation.y) * 0.06;

      // Unfold on scroll
      const scrollZ = ctx.scrollProgress * 1.4;

      // Rotate Coordinator Core
      coreGroup.rotation.y = clock * 0.45 + ctx.currentRotation.y;
      coreGroup.rotation.x = Math.sin(clock * 0.3) * 0.08 + ctx.currentRotation.x;
      coreOuter.rotation.y = -clock * 0.3;
      coreOuter.rotation.z = clock * 0.2;
      eventRing.rotation.z = clock * 0.5;

      coreGroup.position.z = -scrollZ;

      // Pulse Energy State
      let speedMultiplier = 1.0;
      if (ctx.isPulsing) {
        ctx.pulseTimer += 0.016;
        speedMultiplier = 3.2;
        coreInner.material.emissiveIntensity = 2.4;
        corePulseLight.intensity = 3.6;
        if (ctx.pulseTimer > 1.8) {
          ctx.isPulsing = false;
        }
      } else {
        coreInner.material.emissiveIntensity = 1.1 + Math.sin(clock * 2) * 0.25;
        corePulseLight.intensity = 1.2;
      }

      // Animate edge node subtle floating and packet travel
      ctx.nodes.forEach((node, i) => {
        node.position.y += Math.sin(clock * 1.5 + i) * 0.0015;
        node.rotation.y = Math.sin(clock * 0.8 + i) * 0.06 + ctx.currentRotation.y * 0.5;
        node.rotation.x = ctx.currentRotation.x * 0.5;
      });

      ctx.packets.forEach((pkt) => {
        pkt.progress += 0.008 * speedMultiplier;
        if (pkt.progress >= 1.0) {
          pkt.progress = 0;
        }
        const pos = pkt.curve.getPointAt(pkt.progress);
        pkt.mesh.position.copy(pos);
        pkt.mesh.scale.setScalar(ctx.isPulsing ? 1.5 : 1.0);
      });

      renderer.render(scene, camera);
    };

    ctx.frameId = requestAnimationFrame(animate);

    return () => {
      if (ctx.frameId) cancelAnimationFrame(ctx.frameId);
      if (observer) observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('portfolio-theme-change', handleThemeChange);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);

      // Clean up geometries & materials
      innerGeo.dispose();
      innerMat.dispose();
      outerGeo.dispose();
      outerMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      nodeBoxGeo.dispose();
      nodeMat.dispose();
      pipelines.forEach((pipe) => {
        if (pipe.tube && pipe.tube.geometry) pipe.tube.geometry.dispose();
        if (pipe.material) pipe.material.dispose();
      });
      if (renderer) renderer.dispose();
    };
  }, [isMotionPaused, webGLFailed]);

  return (
    <div className="hero-scene-container" ref={containerRef} aria-label="Interactive 3D MacPulse Telemetry">
      <div className="ribbon-canvas-wrapper">
        {webGLFailed ? (
          /* Graceful High-Contrast Architecture SVG Fallback */
          <div className="ribbon-fallback-poster" role="img" aria-label="MacPulse System Architecture Diagram">
            <svg className="fallback-svg" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Coordinator Core */}
              <circle cx="120" cy="120" r="32" fill="var(--bg-surface)" stroke="var(--accent-blue)" strokeWidth="3" />
              <circle cx="120" cy="120" r="14" fill="var(--accent-electric)" />
              
              {/* Pipeline Links */}
              <path d="M50 60 Q80 100 120 120" stroke="var(--accent-blue)" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M190 70 Q160 100 120 120" stroke="var(--accent-blue)" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M120 200 L120 120" stroke="var(--accent-blue)" strokeWidth="2" strokeDasharray="4 4" />

              {/* Edge Daemon Nodes */}
              <rect x="25" y="45" width="48" height="30" rx="4" fill="var(--bg-surface-elevated)" stroke="#10B981" strokeWidth="2" />
              <rect x="165" y="55" width="50" height="30" rx="4" fill="var(--bg-surface-elevated)" stroke="var(--accent-blue)" strokeWidth="2" />
              <rect x="95" y="185" width="50" height="30" rx="4" fill="var(--bg-surface-elevated)" stroke="var(--accent-electric)" strokeWidth="2" />
            </svg>
            <p className="fallback-caption">
              MacPulse Telemetry • Central Coordinator & Edge Daemon Pipelines
            </p>
          </div>
        ) : (
          <canvas
            ref={canvasRef}
            className="ribbon-canvas"
            tabIndex={-1}
            aria-hidden="true"
          />
        )}

        {/* Scene Overlay Controls */}
        <div className="scene-overlay-controls">
          <button
            type="button"
            className="scene-signal-btn"
            onClick={triggerPulse}
            title="Inject an active telemetry pulse across all client daemons into the coordinator"
            aria-label="Send Telemetry Pulse"
          >
            <Zap size={14} className={pulseActive ? "animate-pulse" : ""} />
            <span>Send Telemetry Pulse</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <span style={{ fontSize: '0.725rem', opacity: 0.9, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
              MacPulse Live
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
