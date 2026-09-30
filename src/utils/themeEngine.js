/**
 * themeEngine.js - Algorithmic Color Harmony Engine for Aakash Thapa's Portfolio
 * 
 * Takes a single primary seed hex color and dynamically derives a complete,
 * cohesive design system palette using HSL color mathematics.
 * Accurately reproduces the default high-end aesthetic while adapting:
 * - Backgrounds (--bg-primary, --bg-secondary, --bg-surface, --bg-surface-elevated, --bg-header)
 * - Glassmorphic card surfaces (--bg-surface-glass, --bg-card-hover)
 * - Text gradients (--text-gradient, --text-accent)
 * - Button gradients & shadows (--btn-primary-bg, --btn-primary-text, --btn-primary-shadow, etc.)
 * - Border rings & ambient alpha glows (--border-subtle, --border-medium, --border-highlight, --accent-glow)
 * - 3D WebGL scene lighting & material emissives
 * - Canvas stardust particles
 */

export const DEFAULT_THEME_COLOR = '#7FB5FF';

export const THEME_PRESETS = [
  { id: 'cyber-sky', name: 'Cyber Sky', hex: '#7FB5FF', label: 'Default' },
  { id: 'emerald-pulse', name: 'Emerald Pulse', hex: '#10B981', label: 'Matrix' },
  { id: 'electric-violet', name: 'Electric Violet', hex: '#8B5CF6', label: 'Neon' },
  { id: 'solar-flare', name: 'Solar Flare', hex: '#F59E0B', label: 'Warm' },
  { id: 'crimson-core', name: 'Crimson Core', hex: '#F43F5E', label: 'Vibrant' },
];

/**
 * Converts a hex string (#RGB or #RRGGBB) to HSL values
 * @param {string} hex 
 * @returns {{ h: number, s: number, l: number }}
 */
export function hexToHsl(hex) {
  let cleaned = hex.replace('#', '').trim();
  if (cleaned.length === 3) {
    cleaned = cleaned.split('').map(c => c + c).join('');
  }
  if (cleaned.length !== 6) {
    return { h: 215, s: 100, l: 75 }; // fallback to default blue
  }

  const r = parseInt(cleaned.substring(0, 2), 16) / 255;
  const g = parseInt(cleaned.substring(2, 4), 16) / 255;
  const b = parseInt(cleaned.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/**
 * Converts HSL to a 6-digit hex string
 */
export function hslToHex(h, s, l) {
  const hNorm = (h % 360 + 360) % 360;
  const sNorm = Math.max(0, Math.min(100, s)) / 100;
  const lNorm = Math.max(0, Math.min(100, l)) / 100;

  const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
  const x = c * (1 - Math.abs(((hNorm / 60) % 2) - 1));
  const m = lNorm - c / 2;

  let rPrime = 0;
  let gPrime = 0;
  let bPrime = 0;

  if (hNorm >= 0 && hNorm < 60) {
    rPrime = c; gPrime = x; bPrime = 0;
  } else if (hNorm >= 60 && hNorm < 120) {
    rPrime = x; gPrime = c; bPrime = 0;
  } else if (hNorm >= 120 && hNorm < 180) {
    rPrime = 0; gPrime = c; bPrime = x;
  } else if (hNorm >= 180 && hNorm < 240) {
    rPrime = 0; gPrime = x; bPrime = c;
  } else if (hNorm >= 240 && hNorm < 300) {
    rPrime = x; gPrime = 0; bPrime = c;
  } else {
    rPrime = c; gPrime = 0; bPrime = x;
  }

  const r = Math.round((rPrime + m) * 255);
  const g = Math.round((gPrime + m) * 255);
  const b = Math.round((bPrime + m) * 255);

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

/**
 * Converts a hex string to an integer for Three.js (e.g. 0x7FB5FF)
 */
export function hexToInt(hex) {
  const cleaned = hex.replace('#', '').trim();
  return parseInt(cleaned, 16) || 0x7FB5FF;
}

/**
 * Derives a full design token palette dynamically from a single seed hex color
 * using pure HSL color mathematics.
 * 
 * Accurately calculates every tier of the design system:
 * - Deep obsidian-slate backgrounds tinted by hue (preserving dark mode purity)
 * - Card surfaces & glass undertones
 * - 3-stop luminous button gradients and glowing drop shadows
 * - White-to-accent typography text gradients
 * - Alpha border rings & atmospheric glow halos
 * - Three.js WebGL lighting & material emissives
 * - Canvas 2D stardust particles
 */
export function derivePalette(seedHex) {
  const { h, s, l } = hexToHsl(seedHex);

  // Normalize saturation for dark-mode clarity and tech glow
  const vibrantSat = Math.max(s, 68);

  // 1. Deep Obsidian-Slate Backgrounds tinted by the theme hue
  // (Uses the exact luminance/saturation formula of the signature default theme: 19% sat, 8.2% lum)
  const bgPrimary = hslToHex(h, 19, 8.2);
  const bgSecondary = hslToHex(h, 21, 6.5);
  const bgSurface = hslToHex(h, 20.6, 13.3);
  const bgSurfaceElevated = hslToHex(h, 22.7, 17.3);
  const bgSurfaceGlass = `hsla(${h}, 20.6%, 13.3%, 0.72)`;
  const bgCardHover = `hsla(${h}, 22.7%, 17.3%, 0.88)`;
  const bgHeader = `hsla(${h}, 19%, 8.2%, 0.82)`;
  const bgHeaderScrolled = `hsla(${h}, 19%, 8.2%, 0.94)`;

  // 2. Accents
  // Primary accent anchor preserves user's seed hue and ensures optimal contrast
  const accentPrimary = hslToHex(h, Math.max(vibrantSat, 75), Math.max(l, 72));
  const secondaryHue = (h + 16) % 360;
  const accentSecondary = hslToHex(secondaryHue, Math.min(vibrantSat + 6, 100), 58);
  const highlightHue = (h - 14 + 360) % 360;
  const accentHighlight = hslToHex(highlightHue, Math.min(vibrantSat + 10, 100), 86);

  // 3. Alpha Glows & Borders
  const glowSubtle = `hsla(${h}, ${vibrantSat}%, 74%, 0.08)`;
  const glowMedium = `hsla(${h}, ${vibrantSat}%, 74%, 0.25)`;
  const glowStrong = `hsla(${secondaryHue}, ${vibrantSat}%, 58%, 0.50)`;

  const borderSubtle = `hsla(${h}, ${vibrantSat}%, 74%, 0.10)`;
  const borderMedium = `hsla(${h}, ${vibrantSat}%, 74%, 0.22)`;
  const borderHighlight = `hsla(${h}, ${vibrantSat}%, 74%, 0.45)`;

  // 4. Buttons (3-stop luminous gradient, glowing shadow, dark ink text)
  const btnLight = hslToHex(h, 85, 83);
  const btnMid = accentPrimary;
  const btnDark = hslToHex((h + 10) % 360, 80, 65);
  const btnPrimaryBg = `linear-gradient(135deg, ${btnLight} 0%, ${btnMid} 50%, ${btnDark} 100%)`;
  const btnPrimaryText = hslToHex(h, 35, 8);
  const btnPrimaryShadow = `0 2px 14px ${glowMedium}, inset 0 1px 0 rgba(255, 255, 255, 0.4)`;
  const btnPrimaryShadowHover = `0 6px 22px ${glowStrong}, inset 0 1px 0 rgba(255, 255, 255, 0.6)`;

  // 5. Typography Text Gradient (White -> Bright Accent -> Rich Secondary Finish)
  const textGradient = `linear-gradient(135deg, #FFFFFF 20%, ${btnMid} 70%, ${btnDark} 100%)`;

  return {
    seed: seedHex,
    h,
    s: vibrantSat,
    bgPrimary,
    bgSecondary,
    bgSurface,
    bgSurfaceElevated,
    bgSurfaceGlass,
    bgCardHover,
    bgHeader,
    bgHeaderScrolled,
    accentPrimary,
    accentSecondary,
    accentHighlight,
    glowSubtle,
    glowMedium,
    glowStrong,
    borderSubtle,
    borderMedium,
    borderHighlight,
    btnPrimaryBg,
    btnPrimaryText,
    btnPrimaryShadow,
    btnPrimaryShadowHover,
    textGradient,
    threePrimary: hexToInt(accentPrimary),
    threeSecondary: hexToInt(accentSecondary),
    threeHighlight: hexToInt(accentHighlight),
    sparkleColors: ['#FFFFFF', accentPrimary, accentHighlight, accentSecondary],
  };
}

/**
 * Injects the derived palette directly into :root CSS custom properties
 * and broadcasts the change to canvas/WebGL listeners.
 */
export function applyTheme(seedHex, persist = true) {
  if (typeof document === 'undefined') return;

  const palette = derivePalette(seedHex);
  const root = document.documentElement;

  // Background Studio Tokens
  root.style.setProperty('--bg-primary', palette.bgPrimary);
  root.style.setProperty('--bg-secondary', palette.bgSecondary);
  root.style.setProperty('--bg-surface', palette.bgSurface);
  root.style.setProperty('--bg-surface-elevated', palette.bgSurfaceElevated);
  root.style.setProperty('--bg-surface-glass', palette.bgSurfaceGlass);
  root.style.setProperty('--bg-card-hover', palette.bgCardHover);
  root.style.setProperty('--bg-header', palette.bgHeader);
  root.style.setProperty('--bg-header-scrolled', palette.bgHeaderScrolled);

  // Accent & Illumination Tokens
  root.style.setProperty('--accent-blue', palette.accentPrimary);
  root.style.setProperty('--accent-electric', palette.accentSecondary);
  root.style.setProperty('--text-accent', palette.accentPrimary);

  root.style.setProperty('--accent-glow', palette.glowMedium);
  root.style.setProperty('--accent-glow-subtle', palette.glowSubtle);
  root.style.setProperty('--accent-glow-strong', palette.glowStrong);

  // Structural Border Tokens
  root.style.setProperty('--border-subtle', palette.borderSubtle);
  root.style.setProperty('--border-medium', palette.borderMedium);
  root.style.setProperty('--border-highlight', palette.borderHighlight);

  // Buttons & Interactive Elements
  root.style.setProperty('--btn-primary-bg', palette.btnPrimaryBg);
  root.style.setProperty('--btn-primary-text', palette.btnPrimaryText);
  root.style.setProperty('--btn-primary-shadow', palette.btnPrimaryShadow);
  root.style.setProperty('--btn-primary-shadow-hover', palette.btnPrimaryShadowHover);

  // Text Gradients
  root.style.setProperty('--text-gradient', palette.textGradient);

  // Broadcast event for WebGL / Canvas components
  window.dispatchEvent(new CustomEvent('portfolio-theme-change', { detail: palette }));

  if (persist) {
    try {
      sessionStorage.setItem('portfolio-session-theme', seedHex);
      localStorage.setItem('portfolio-last-random-theme', seedHex);
    } catch {
      // Ignore storage quota or disabled storage
    }
  }

  return palette;
}

/**
 * Returns a random preset color, optionally avoiding the previous randomly chosen color
 * @param {string|null} excludeHex
 * @returns {string}
 */
export function getRandomPresetColor(excludeHex = null) {
  const pool = THEME_PRESETS.map((p) => p.hex);
  const candidates = excludeHex 
    ? pool.filter((c) => c.toLowerCase() !== excludeHex.toLowerCase()) 
    : pool;
  const list = candidates.length > 0 ? candidates : pool;
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
}

/**
 * Retrieves the active theme for the current browser tab session.
 * If this is a new browser tab/session (sessionStorage empty), it automatically
 * selects a fresh color scheme randomly from the curated presets.
 * Within the same tab session, it preserves the selected theme across refreshes.
 */
export function getStoredTheme() {
  if (typeof window === 'undefined') return DEFAULT_THEME_COLOR;

  try {
    // 1. If this tab session already has a theme assigned, retain it
    const sessionTheme = sessionStorage.getItem('portfolio-session-theme');
    if (sessionTheme) {
      return sessionTheme;
    }

    // 2. New tab opened! Randomly select a fresh color from the presets,
    // avoiding the last one used for visual variety
    const lastColor = localStorage.getItem('portfolio-last-random-theme');
    const newRandomColor = getRandomPresetColor(lastColor);

    // Save to this tab's session
    sessionStorage.setItem('portfolio-session-theme', newRandomColor);
    localStorage.setItem('portfolio-last-random-theme', newRandomColor);

    return newRandomColor;
  } catch {
    return getRandomPresetColor();
  }
}

/**
 * Resets the theme to the default Cyber Sky palette
 */
export function resetTheme() {
  return applyTheme(DEFAULT_THEME_COLOR, true);
}
