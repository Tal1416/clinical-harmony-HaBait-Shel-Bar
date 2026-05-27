// Clinical Harmony — shared Tailwind theme (Stitch design system)
// Must be included BEFORE Tailwind CDN script on every page.
window.tailwind = window.tailwind || {};
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "inverse-surface": "#2e3132",
        "surface-container": "#eceeef",
        "surface-container-low": "#f2f4f5",
        "inverse-on-surface": "#eff1f2",
        "secondary": "#5f5982",
        "outline-variant": "#bdc9ca",
        "surface-variant": "#e1e3e4",
        "error-container": "#ffdad6",
        "on-primary": "#ffffff",
        "primary": "#006168",
        "error": "#ba1a1a",
        "tertiary-fixed": "#e4e1ea",
        "inverse-primary": "#7cd4dd",
        "on-primary-fixed": "#002022",
        "surface-container-high": "#e7e8e9",
        "on-secondary-fixed-variant": "#474269",
        "tertiary-fixed-dim": "#c8c5ce",
        "primary-fixed-dim": "#7cd4dd",
        "surface-container-lowest": "#ffffff",
        "on-secondary-container": "#5b557d",
        "primary-container": "#0d7c84",
        "secondary-fixed": "#e5deff",
        "surface-dim": "#d8dadb",
        "on-secondary": "#ffffff",
        "on-primary-container": "#d9fcff",
        "surface-container-highest": "#e1e3e4",
        "primary-fixed": "#98f1f9",
        "surface": "#f8f9fa",
        "on-surface-variant": "#3e494a",
        "on-tertiary": "#ffffff",
        "on-error": "#ffffff",
        "secondary-fixed-dim": "#c9c1f0",
        "on-tertiary-fixed": "#1b1b21",
        "secondary-container": "#d4ccfc",
        "outline": "#6e797a",
        "surface-tint": "#006970",
        "tertiary-container": "#706f77",
        "on-primary-fixed-variant": "#004f54",
        "background": "#f8f9fa",
        "on-tertiary-container": "#f7f3fc",
        "on-error-container": "#93000a",
        "on-tertiary-fixed-variant": "#46464d",
        "on-secondary-fixed": "#1c163b",
        "on-background": "#191c1d",
        "surface-bright": "#f8f9fa",
        "on-surface": "#191c1d",
        "tertiary": "#57575e",
        "status-safe": "#1f6f43",
        "status-safe-container": "#d6f1de",
        "status-monitor": "#a36b00",
        "status-monitor-container": "#fde7b3"
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        full: "9999px"
      },
      spacing: {
        unit: "8px",
        "container-padding-mobile": "16px",
        "container-padding-desktop": "40px",
        "stack-md": "16px",
        gutter: "24px",
        "stack-lg": "32px",
        "stack-sm": "8px"
      },
      fontFamily: {
        "label-caps": ["Atkinson Hyperlegible Next", "system-ui", "sans-serif"],
        "data-mono": ["Atkinson Hyperlegible Next", "system-ui", "sans-serif"],
        "body-lg": ["Atkinson Hyperlegible Next", "system-ui", "sans-serif"],
        "body-md": ["Atkinson Hyperlegible Next", "system-ui", "sans-serif"],
        "body-sm": ["Atkinson Hyperlegible Next", "system-ui", "sans-serif"],
        "headline-md": ["Manrope", "system-ui", "sans-serif"],
        "headline-lg-mobile": ["Manrope", "system-ui", "sans-serif"],
        "headline-sm": ["Manrope", "system-ui", "sans-serif"],
        "headline-lg": ["Manrope", "system-ui", "sans-serif"]
      },
      fontSize: {
        "label-caps": ["12px", { lineHeight: "16px", letterSpacing: "0.05em", fontWeight: "700" }],
        "data-mono": ["16px", { lineHeight: "24px", letterSpacing: "0.01em", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "headline-md": ["24px", { lineHeight: "32px", fontWeight: "600" }],
        "headline-lg-mobile": ["24px", { lineHeight: "32px", letterSpacing: "-0.01em", fontWeight: "700" }],
        "headline-sm": ["20px", { lineHeight: "28px", fontWeight: "600" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "body-sm": ["14px", { lineHeight: "20px", fontWeight: "400" }],
        "headline-lg": ["32px", { lineHeight: "40px", letterSpacing: "-0.02em", fontWeight: "700" }]
      }
    }
  }
};
