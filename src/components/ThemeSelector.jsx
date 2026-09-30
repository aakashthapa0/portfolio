import React, { useState, useEffect, useRef } from 'react';
import { Palette, Check, RotateCcw } from 'lucide-react';
import { 
  THEME_PRESETS, 
  DEFAULT_THEME_COLOR, 
  applyTheme, 
  getStoredTheme, 
  resetTheme 
} from '../utils/themeEngine';

export default function ThemeSelector({ isMobile = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentColor, setCurrentColor] = useState(() => getStoredTheme());
  const popoverRef = useRef(null);
  const triggerRef = useRef(null);

  // Sync state if another instance (e.g. mobile drawer vs desktop) triggers theme change
  useEffect(() => {
    const handleThemeChange = (e) => {
      if (e.detail?.seed) {
        setCurrentColor(e.detail.seed);
      }
    };
    window.addEventListener('portfolio-theme-change', handleThemeChange);
    return () => window.removeEventListener('portfolio-theme-change', handleThemeChange);
  }, []);

  // Close popover when clicking outside or pressing Escape
  useEffect(() => {
    if (!isOpen || isMobile) return;

    const handleClickOutside = (e) => {
      if (
        popoverRef.current && 
        !popoverRef.current.contains(e.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isMobile]);

  const handleSelectColor = (hex) => {
    setCurrentColor(hex);
    applyTheme(hex, true);
  };

  const handleReset = () => {
    resetTheme();
    setCurrentColor(DEFAULT_THEME_COLOR);
  };

  if (isMobile) {
    // Inline rendition for Mobile Navigation Drawer
    return (
      <div className="theme-mobile-section" aria-label="Theme Customizer">
        <div className="theme-mobile-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            <Palette size={15} color="var(--accent-blue)" />
            <span>Theme Harmony</span>
          </div>
          {currentColor.toLowerCase() !== DEFAULT_THEME_COLOR.toLowerCase() && (
            <button 
              type="button" 
              className="theme-reset-mini-btn"
              onClick={handleReset}
              title="Reset to default theme"
              aria-label="Reset theme to default"
            >
              <RotateCcw size={13} />
              <span>Reset</span>
            </button>
          )}
        </div>

        <div className="theme-presets-row">
          {THEME_PRESETS.map((preset) => {
            const isSelected = currentColor.toLowerCase() === preset.hex.toLowerCase();
            return (
              <button
                key={preset.id}
                type="button"
                className={`theme-swatch-btn ${isSelected ? 'active' : ''}`}
                style={{ backgroundColor: preset.hex }}
                onClick={() => handleSelectColor(preset.hex)}
                title={`${preset.name} (${preset.label})`}
                aria-label={`Select ${preset.name} theme`}
              >
                {isSelected && <Check size={14} color="#FFFFFF" strokeWidth={3} />}
              </button>
            );
          })}

          {/* Custom Color Input */}
          <label className="theme-custom-picker-label" title="Custom color picker">
            <input
              type="color"
              className="theme-native-color-input"
              value={currentColor}
              onChange={(e) => handleSelectColor(e.target.value)}
              aria-label="Choose custom theme color"
            />
            <span className="theme-custom-swatch-preview" style={{ background: currentColor }} />
          </label>
        </div>
      </div>
    );
  }

  // Desktop Popover rendition
  return (
    <div className="theme-selector-wrap">
      <button
        ref={triggerRef}
        type="button"
        className={`theme-trigger-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Customize Portfolio Theme Color"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        title="Customize Theme Palette"
      >
        <Palette size={16} />
        <span 
          className="theme-active-dot" 
          style={{ backgroundColor: currentColor }} 
          aria-hidden="true" 
        />
      </button>

      {isOpen && (
        <div 
          ref={popoverRef} 
          className="theme-popover" 
          role="dialog" 
          aria-label="Theme Customizer"
        >
          <div className="theme-popover-header">
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                Theme Harmony
              </div>
              <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                Select an anchor color to adapt the entire site
              </div>
            </div>

            {currentColor.toLowerCase() !== DEFAULT_THEME_COLOR.toLowerCase() && (
              <button
                type="button"
                className="theme-reset-mini-btn"
                onClick={handleReset}
                title="Reset to default theme"
                aria-label="Reset theme to default"
              >
                <RotateCcw size={12} />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Presets Grid */}
          <div className="theme-popover-presets">
            {THEME_PRESETS.map((preset) => {
              const isSelected = currentColor.toLowerCase() === preset.hex.toLowerCase();
              return (
                <button
                  key={preset.id}
                  type="button"
                  className={`theme-preset-card ${isSelected ? 'active' : ''}`}
                  onClick={() => handleSelectColor(preset.hex)}
                  aria-label={`Select ${preset.name} theme`}
                >
                  <span 
                    className="theme-preset-swatch" 
                    style={{ backgroundColor: preset.hex }}
                  >
                    {isSelected && <Check size={13} color="#FFFFFF" strokeWidth={3} />}
                  </span>
                  <div className="theme-preset-info">
                    <span className="theme-preset-name">{preset.name}</span>
                    <span className="theme-preset-label">{preset.label}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Custom Color Wheel / Hex Input */}
          <div className="theme-custom-row">
            <span style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
              Custom Anchor:
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <label className="theme-custom-picker-label" title="Click to open color picker">
                <input
                  type="color"
                  className="theme-native-color-input"
                  value={currentColor}
                  onChange={(e) => handleSelectColor(e.target.value)}
                  aria-label="Pick custom theme color"
                />
                <span className="theme-custom-swatch-preview" style={{ background: currentColor }} />
              </label>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.775rem', color: 'var(--text-accent)' }}>
                {currentColor.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
