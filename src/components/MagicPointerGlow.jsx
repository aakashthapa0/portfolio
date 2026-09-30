import React, { useEffect, useRef, useState } from 'react';

export default function MagicPointerGlow({ isMotionPaused }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const ambientRef = useRef(null);
  const orbRef = useRef(null);
  const coreRef = useRef(null);
  const canvasRef = useRef(null);

  const mousePos = useRef({ x: -1000, y: -1000 });
  const orbPos = useRef({ x: -1000, y: -1000 });
  const ambientPos = useRef({ x: -1000, y: -1000 });
  const lastSpawnPos = useRef({ x: -1000, y: -1000 });
  const particles = useRef([]);
  const animFrameId = useRef(null);

  const activeCardRef = useRef(null);

  // Check if device supports fine hover pointer (mouse/trackpad, not touch)
  const [isFinePointer, setIsFinePointer] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(pointer: fine)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const media = window.matchMedia('(pointer: fine)');

    const handleMediaChange = (e) => setIsFinePointer(e.matches);
    media.addEventListener('change', handleMediaChange);
    return () => media.removeEventListener('change', handleMediaChange);
  }, []);

  // Reset any active card tilt if user pauses motion
  useEffect(() => {
    if (isMotionPaused && activeCardRef.current) {
      activeCardRef.current.style.transition = 'transform 450ms cubic-bezier(0.2, 0.8, 0.2, 1)';
      activeCardRef.current.style.transform = '';
      activeCardRef.current = null;
    }
  }, [isMotionPaused]);

  useEffect(() => {
    if (!isFinePointer) return;

    const TILT_CARDS_SELECTOR = [
      '.device-node-card',
      '.timeline-item',
      '.capability-card',
      '.education-card',
      '.principle-item',
      '.contact-card',
      '.macpulse-hero-card',
      '.telemetry-card',
      '.glass-panel',
      '.arch-flow-node',
      '.case-study-meta-item',
      '.roadmap-card',
      '.ai-diagnostics-card',
      '.case-study-highlight-card'
    ].join(', ');

    const resetCard = (card) => {
      if (!card) return;
      card.style.transition = 'transform 450ms cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 320ms ease, border-color 300ms ease';
      card.style.transform = '';
    };

    const handlePointerMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      setIsVisible(true);

      const target = e.target;
      if (!target) return;

      // Check if hovering interactive element for pointer light expansion
      const interactive = Boolean(
        target.closest('a, button, input, textarea, select, [role="button"], .device-node-card, .timeline-item, .capability-card, .education-card, .principle-item, .contact-btn, .metric-card, .arch-pill, .glass-panel, .arch-flow-node, .case-study-meta-item, .roadmap-card, .ai-diagnostics-card, .case-study-highlight-card')
      );
      setIsInteractive(interactive);

      // 3D Card Magnetic Tilt animation following pointer position
      if (!isMotionPaused) {
        const card = target.closest(TILT_CARDS_SELECTOR);

        if (card) {
          if (activeCardRef.current && activeCardRef.current !== card) {
            resetCard(activeCardRef.current);
          }
          activeCardRef.current = card;

          const rect = card.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Normalized coordinates: -1 (left/top) to +1 (right/bottom)
            const normX = Math.max(-1, Math.min(1, (x / rect.width) * 2 - 1));
            const normY = Math.max(-1, Math.min(1, (y / rect.height) * 2 - 1));

            // Max tilt angle (degrees): perfectly balanced subtle sweet spot
            const maxTilt = 2.6;
            const rotX = -normY * maxTilt;
            const rotY = normX * maxTilt;

            // Balanced card-specific hover lift
            let lift = -5;
            if (card.classList.contains('capability-card')) lift = -6;
            if (card.classList.contains('principle-item')) lift = -4;
            if (card.classList.contains('arch-flow-node')) lift = -6;
            if (card.classList.contains('glass-panel')) lift = -6;
            if (card.classList.contains('roadmap-card')) lift = -6;
            if (card.classList.contains('case-study-meta-item')) lift = -5;
            if (card.classList.contains('ai-diagnostics-card')) lift = -5;
            if (card.classList.contains('case-study-highlight-card')) lift = -5;

            card.style.transition = 'transform 130ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 300ms ease, border-color 300ms ease';
            card.style.transform = `perspective(1400px) translateY(${lift}px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.006, 1.006, 1.006)`;
            card.style.transformStyle = 'preserve-3d';
          }
        } else if (activeCardRef.current) {
          resetCard(activeCardRef.current);
          activeCardRef.current = null;
        }
      }
    };

    const handlePointerLeave = () => {
      setIsVisible(false);
      if (activeCardRef.current) {
        resetCard(activeCardRef.current);
        activeCardRef.current = null;
      }
    };

    const handleScrollOrBlur = () => {
      if (activeCardRef.current) {
        resetCard(activeCardRef.current);
        activeCardRef.current = null;
      }
    };

    const handlePointerEnter = () => {
      setIsVisible(true);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      // Spawn burst of stardust sparkles on click
      if (!isMotionPaused && canvasRef.current) {
        for (let i = 0; i < 7; i++) {
          const angle = (Math.PI * 2 * i) / 7 + (Math.random() - 0.5) * 0.5;
          const speed = 1.8 + Math.random() * 2.4;
          particles.current.push({
            x: mousePos.current.x,
            y: mousePos.current.y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: 2 + Math.random() * 2,
            alpha: 0.95,
            decay: 0.032,
            color: ['#FFFFFF', '#7FB5FF', '#A8D1FF', '#60A5FA'][Math.floor(Math.random() * 4)],
          });
        }
      }
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('pointerenter', handlePointerEnter);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('scroll', handleScrollOrBlur, { passive: true });
    window.addEventListener('blur', handleScrollOrBlur);

    return () => {
      if (activeCardRef.current) {
        resetCard(activeCardRef.current);
        activeCardRef.current = null;
      }
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('pointerenter', handlePointerEnter);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('scroll', handleScrollOrBlur);
      window.removeEventListener('blur', handleScrollOrBlur);
    };
  }, [isFinePointer, isMotionPaused]);

  // Main 60fps/120fps animation loop
  useEffect(() => {
    if (!isFinePointer) return;

    let canvas = canvasRef.current;
    let ctx = canvas ? canvas.getContext('2d') : null;

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const render = () => {
      const targetX = mousePos.current.x;
      const targetY = mousePos.current.y;

      // Initialize on first move
      if (orbPos.current.x === -1000) {
        orbPos.current.x = targetX;
        orbPos.current.y = targetY;
        ambientPos.current.x = targetX;
        ambientPos.current.y = targetY;
      }

      // Smooth fluid inertia lerp
      const orbLerp = isMotionPaused ? 1 : 0.22;
      const ambientLerp = isMotionPaused ? 1 : 0.09;

      orbPos.current.x += (targetX - orbPos.current.x) * orbLerp;
      orbPos.current.y += (targetY - orbPos.current.y) * orbLerp;

      ambientPos.current.x += (targetX - ambientPos.current.x) * ambientLerp;
      ambientPos.current.y += (targetY - ambientPos.current.y) * ambientLerp;

      // Update DOM transforms directly for GPU acceleration
      if (orbRef.current) {
        orbRef.current.style.transform = `translate3d(${orbPos.current.x}px, ${orbPos.current.y}px, 0)`;
      }
      if (coreRef.current) {
        coreRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      }
      if (ambientRef.current) {
        ambientRef.current.style.transform = `translate3d(${ambientPos.current.x}px, ${ambientPos.current.y}px, 0)`;
      }

      // Manage sparkles on canvas
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Spawn movement sparkles if moved enough
        if (!isMotionPaused && targetX > 0 && targetY > 0) {
          const dx = targetX - lastSpawnPos.current.x;
          const dy = targetY - lastSpawnPos.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist > 18 && particles.current.length < 28) {
            lastSpawnPos.current.x = targetX;
            lastSpawnPos.current.y = targetY;

            const spreadAngle = Math.random() * Math.PI * 2;
            const spreadDist = Math.random() * 8;
            particles.current.push({
              x: targetX + Math.cos(spreadAngle) * spreadDist,
              y: targetY + Math.sin(spreadAngle) * spreadDist,
              vx: (Math.random() - 0.5) * 0.8 - dx * 0.05,
              vy: (Math.random() - 0.5) * 0.8 - dy * 0.05,
              size: 1.5 + Math.random() * 2,
              alpha: 0.85,
              decay: 0.025 + Math.random() * 0.02,
              color: ['#FFFFFF', '#7FB5FF', '#A8D1FF', '#93C5FD'][Math.floor(Math.random() * 4)],
            });
          }
        }

        // Draw and update active particles
        for (let i = particles.current.length - 1; i >= 0; i--) {
          const p = particles.current[i];
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= p.decay;

          if (p.alpha <= 0) {
            particles.current.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isFinePointer, isMotionPaused]);

  if (!isFinePointer) return null;

  return (
    <div 
      className={`magic-pointer-system ${isVisible ? 'visible' : ''} ${isInteractive ? 'interactive' : ''} ${isClicking ? 'clicking' : ''}`}
      aria-hidden="true"
    >
      {/* 1. Large Ambient Flashlight Glow (reveals dark engineering background) */}
      <div ref={ambientRef} className="magic-ambient-glow" />

      {/* 2. Sparkles Particle Canvas (stardust trail) */}
      <canvas ref={canvasRef} className="magic-sparkles-canvas" />

      {/* 3. Luminous Magic Orb Ring */}
      <div ref={orbRef} className="magic-pointer-orb">
        <div className="magic-orb-inner-ring" />
        <div className="magic-orb-pulse" />
      </div>

      {/* 4. Instant Pinpoint Star Core */}
      <div ref={coreRef} className="magic-pointer-core" />
    </div>
  );
}
