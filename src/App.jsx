import React, { useState, useEffect, Suspense, lazy } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MacPulseFeature from './components/MacPulseFeature';
import Experience from './components/Experience';
import Capabilities from './components/Capabilities';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MagicPointerGlow from './components/MagicPointerGlow';
import { applyTheme, getStoredTheme } from './utils/themeEngine';
import { initSmoothScroll, stopScroll, startScroll, scrollTo } from './utils/smoothScroll';

const ResumeModal = lazy(() => import('./components/ResumeModal'));
const MacPulseCaseStudy = lazy(() => import('./components/MacPulseCaseStudy'));

export default function App() {
  // Determine initial route from pathname or hash
  const getInitialPath = () => {
    const path = window.location.pathname;
    const hash = window.location.hash;
    if (path.includes('/projects/macpulse') || hash.includes('/projects/macpulse')) {
      return '/projects/macpulse';
    }
    return '/';
  };

  const [currentPath, setCurrentPath] = useState(getInitialPath);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  
  // Initialize motion pause state checking OS prefers-reduced-motion
  const [isMotionPaused, setIsMotionPaused] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  // Initialize Lenis 60 FPS Smooth Scroll on mount and keep in sync
  useEffect(() => {
    initSmoothScroll(isMotionPaused);
  }, [isMotionPaused]);

  // Lock background scroll when Resume modal is active
  useEffect(() => {
    if (isResumeOpen) {
      stopScroll();
    } else {
      startScroll();
    }
  }, [isResumeOpen]);

  // Apply stored theme on initial app mount
  useEffect(() => {
    applyTheme(getStoredTheme(), false);
  }, []);

  // Listen to popstate (browser back/forward)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(getInitialPath());
      scrollTo(0, { immediate: true });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Listen to OS prefers-reduced-motion change
  useEffect(() => {
    if (!window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e) => {
      setIsMotionPaused(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const navigateTo = (path) => {
    setCurrentPath(path);
    if (window.history.pushState) {
      window.history.pushState({}, '', path);
    }
    scrollTo(0, { immediate: true });
  };

  return (
    <div className="app-container">
      {/* Magic Pointer Glow & Ambient Stardust Light */}
      <MagicPointerGlow isMotionPaused={isMotionPaused} />

      {/* Top Fixed Header */}
      <Header
        currentPath={currentPath}
        onNavigate={navigateTo}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Main Content Area */}
      <main id="main-content" tabIndex={-1}>
        {currentPath === '/projects/macpulse' ? (
          <Suspense fallback={
            <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-accent)' }}>
                Loading MacPulse Case Study...
              </div>
            </div>
          }>
            <MacPulseCaseStudy onBackToHome={() => navigateTo('/')} />
          </Suspense>
        ) : (
          <>
            <Hero
              onOpenResume={() => setIsResumeOpen(true)}
              isMotionPaused={isMotionPaused}
            />
            <MacPulseFeature
              onNavigateToCaseStudy={() => navigateTo('/projects/macpulse')}
            />
            <Experience />
            <Capabilities />
            <About />
            <Contact
              onOpenResume={() => setIsResumeOpen(true)}
            />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Resume Modal */}
      {isResumeOpen && (
        <Suspense fallback={null}>
          <ResumeModal
            isOpen={isResumeOpen}
            onClose={() => setIsResumeOpen(false)}
          />
        </Suspense>
      )}
    </div>
  );
}
