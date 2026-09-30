/**
 * smoothScroll.js - 60 FPS Momentum Inertia Smooth Scroll Engine
 * Powered by Lenis with adaptive RAF synchronization, pause/resume locking,
 * and high-precision anchor scrolling.
 */
import Lenis from 'lenis';

let lenisInstance = null;
let rafId = null;

export function initSmoothScroll(isMotionPaused = false) {
  if (typeof window === 'undefined') return null;
  if (lenisInstance) {
    updateMotionPaused(isMotionPaused);
    return lenisInstance;
  }

  const isReducedMotion = isMotionPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  lenisInstance = new Lenis({
    duration: isReducedMotion ? 0.01 : 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Snappy luxury exponential ease-out
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: !isReducedMotion,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.25,
    infinite: false,
    autoRaf: false,
  });

  // Expose on window for components & developer tools
  window.lenis = lenisInstance;

  // Dedicated high-frequency RAF loop
  function raf(time) {
    lenisInstance?.raf(time);
    rafId = requestAnimationFrame(raf);
  }
  rafId = requestAnimationFrame(raf);

  return lenisInstance;
}

export function getLenis() {
  return lenisInstance;
}

export function updateMotionPaused(isPaused) {
  if (!lenisInstance) return;
  const isReducedMotion = isPaused || (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  lenisInstance.options.smoothWheel = !isReducedMotion;
  lenisInstance.options.duration = isReducedMotion ? 0.01 : 1.2;
}

export function scrollTo(target, options = {}) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, {
      offset: -80,
      duration: 1.2,
      ...options,
    });
  } else {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: 'smooth' });
    }
  }
}

export function stopScroll() {
  lenisInstance?.stop();
  if (typeof document !== 'undefined') {
    document.documentElement.classList.add('lenis-stopped');
  }
}

export function startScroll() {
  lenisInstance?.start();
  if (typeof document !== 'undefined') {
    document.documentElement.classList.remove('lenis-stopped');
  }
}

export function destroySmoothScroll() {
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
  if (typeof window !== 'undefined') {
    delete window.lenis;
  }
}
