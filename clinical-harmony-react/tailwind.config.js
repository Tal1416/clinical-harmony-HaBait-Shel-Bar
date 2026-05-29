/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  // Dynamic class names ( `bg-${tone}`, `text-${tone}`, `bg-${tone}-container/40` )
  // won't be picked up by the JIT scanner, so list them explicitly.
  safelist: [
    'bg-primary', 'bg-secondary', 'bg-tertiary', 'bg-error', 'bg-status-safe', 'bg-status-monitor',
    'text-primary', 'text-secondary', 'text-tertiary', 'text-error', 'text-status-safe', 'text-status-monitor',
    'border-primary', 'border-secondary', 'border-error', 'border-status-monitor',
    // Container & opacity variants used in Landing feature cards & dashboard tone chips
    {
      pattern: /(bg|text|border|ring)-(primary|secondary|tertiary)(-container)?(\/(5|10|15|20|25|30|40|50|60|70|80|90))?/,
      variants: ['hover', 'group-hover', 'focus', 'group-open']
    },
    {
      pattern: /(bg|text)-(status-safe|status-monitor|error)(-container)?(\/(10|20|30|40|50|60))?/
    }
  ],
  theme: {
    extend: {
      colors: {
        // ─── Bloom palette ───
        // Primary: deep plum/rose. Secondary: sage green. Surfaces: warm cream.
        // Every token is wired to a CSS variable (RGB triplet) defined in
        // index.css for `:root` (light) and `.dark`. Using the `<alpha-value>`
        // placeholder keeps Tailwind's `/opacity` modifiers working
        // (e.g. bg-primary/20). Token *names* are unchanged, so existing
        // classes (text-primary, bg-secondary-container, …) re-theme for free.
        primary: 'rgb(var(--c-primary) / <alpha-value>)',
        'on-primary': 'rgb(var(--c-on-primary) / <alpha-value>)',
        'primary-container': 'rgb(var(--c-primary-container) / <alpha-value>)',
        'on-primary-container': 'rgb(var(--c-on-primary-container) / <alpha-value>)',
        'primary-fixed': 'rgb(var(--c-primary-fixed) / <alpha-value>)',
        'primary-fixed-dim': 'rgb(var(--c-primary-fixed-dim) / <alpha-value>)',
        'on-primary-fixed': 'rgb(var(--c-on-primary-fixed) / <alpha-value>)',
        'on-primary-fixed-variant': 'rgb(var(--c-on-primary-fixed-variant) / <alpha-value>)',
        'inverse-primary': 'rgb(var(--c-inverse-primary) / <alpha-value>)',
        'surface-tint': 'rgb(var(--c-surface-tint) / <alpha-value>)',

        secondary: 'rgb(var(--c-secondary) / <alpha-value>)',
        'on-secondary': 'rgb(var(--c-on-secondary) / <alpha-value>)',
        'secondary-container': 'rgb(var(--c-secondary-container) / <alpha-value>)',
        'on-secondary-container': 'rgb(var(--c-on-secondary-container) / <alpha-value>)',
        'secondary-fixed': 'rgb(var(--c-secondary-fixed) / <alpha-value>)',
        'secondary-fixed-dim': 'rgb(var(--c-secondary-fixed-dim) / <alpha-value>)',
        'on-secondary-fixed': 'rgb(var(--c-on-secondary-fixed) / <alpha-value>)',
        'on-secondary-fixed-variant': 'rgb(var(--c-on-secondary-fixed-variant) / <alpha-value>)',

        tertiary: 'rgb(var(--c-tertiary) / <alpha-value>)',
        'on-tertiary': 'rgb(var(--c-on-tertiary) / <alpha-value>)',
        'tertiary-container': 'rgb(var(--c-tertiary-container) / <alpha-value>)',
        'on-tertiary-container': 'rgb(var(--c-on-tertiary-container) / <alpha-value>)',
        'tertiary-fixed': 'rgb(var(--c-tertiary-fixed) / <alpha-value>)',
        'tertiary-fixed-dim': 'rgb(var(--c-tertiary-fixed-dim) / <alpha-value>)',
        'on-tertiary-fixed': 'rgb(var(--c-on-tertiary-fixed) / <alpha-value>)',
        'on-tertiary-fixed-variant': 'rgb(var(--c-on-tertiary-fixed-variant) / <alpha-value>)',

        error: 'rgb(var(--c-error) / <alpha-value>)',
        'on-error': 'rgb(var(--c-on-error) / <alpha-value>)',
        'error-container': 'rgb(var(--c-error-container) / <alpha-value>)',
        'on-error-container': 'rgb(var(--c-on-error-container) / <alpha-value>)',

        surface: 'rgb(var(--c-surface) / <alpha-value>)',
        'on-surface': 'rgb(var(--c-on-surface) / <alpha-value>)',
        'on-surface-variant': 'rgb(var(--c-on-surface-variant) / <alpha-value>)',
        'surface-variant': 'rgb(var(--c-surface-variant) / <alpha-value>)',
        'surface-dim': 'rgb(var(--c-surface-dim) / <alpha-value>)',
        'surface-bright': 'rgb(var(--c-surface-bright) / <alpha-value>)',
        'surface-container-lowest': 'rgb(var(--c-surface-container-lowest) / <alpha-value>)',
        'surface-container-low': 'rgb(var(--c-surface-container-low) / <alpha-value>)',
        'surface-container': 'rgb(var(--c-surface-container) / <alpha-value>)',
        'surface-container-high': 'rgb(var(--c-surface-container-high) / <alpha-value>)',
        'surface-container-highest': 'rgb(var(--c-surface-container-highest) / <alpha-value>)',
        'inverse-surface': 'rgb(var(--c-inverse-surface) / <alpha-value>)',
        'inverse-on-surface': 'rgb(var(--c-inverse-on-surface) / <alpha-value>)',
        outline: 'rgb(var(--c-outline) / <alpha-value>)',
        'outline-variant': 'rgb(var(--c-outline-variant) / <alpha-value>)',

        background: 'rgb(var(--c-background) / <alpha-value>)',
        'on-background': 'rgb(var(--c-on-background) / <alpha-value>)',

        'status-safe': 'rgb(var(--c-status-safe) / <alpha-value>)',
        'status-safe-container': 'rgb(var(--c-status-safe-container) / <alpha-value>)',
        'status-monitor': 'rgb(var(--c-status-monitor) / <alpha-value>)',
        'status-monitor-container': 'rgb(var(--c-status-monitor-container) / <alpha-value>)'
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        full: '9999px'
      },
      spacing: {
        unit: '8px',
        'container-padding-mobile': '16px',
        'container-padding-desktop': '40px',
        'stack-md': '16px',
        gutter: '24px',
        'stack-lg': '32px',
        'stack-sm': '8px'
      },
      fontFamily: {
        'label-caps': ['Atkinson Hyperlegible Next', 'system-ui', 'sans-serif'],
        'data-mono': ['Atkinson Hyperlegible Next', 'system-ui', 'sans-serif'],
        'body-lg': ['Atkinson Hyperlegible Next', 'system-ui', 'sans-serif'],
        'body-md': ['Atkinson Hyperlegible Next', 'system-ui', 'sans-serif'],
        'body-sm': ['Atkinson Hyperlegible Next', 'system-ui', 'sans-serif'],
        'headline-md': ['Manrope', 'system-ui', 'sans-serif'],
        'headline-lg-mobile': ['Manrope', 'system-ui', 'sans-serif'],
        'headline-sm': ['Manrope', 'system-ui', 'sans-serif'],
        'headline-lg': ['Manrope', 'system-ui', 'sans-serif']
      },
      fontSize: {
        'label-caps': ['12px', { lineHeight: '16px', letterSpacing: '0.05em', fontWeight: '700' }],
        'data-mono': ['16px', { lineHeight: '24px', letterSpacing: '0.01em', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '28px', fontWeight: '400' }],
        'headline-md': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        'headline-lg-mobile': ['24px', { lineHeight: '32px', letterSpacing: '-0.01em', fontWeight: '700' }],
        'headline-sm': ['20px', { lineHeight: '28px', fontWeight: '600' }],
        'body-md': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'headline-lg': ['32px', { lineHeight: '40px', letterSpacing: '-0.02em', fontWeight: '700' }]
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ]
};
