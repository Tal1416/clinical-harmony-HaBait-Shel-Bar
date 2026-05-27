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
        // Primary: deep plum/rose. Secondary: sage green.
        // Surfaces shift to warm cream. Token *names* preserved so every
        // existing class (text-primary, bg-secondary-container, etc.) updates
        // without rewriting components.
        primary: '#8E3A5D',
        'on-primary': '#ffffff',
        'primary-container': '#A5476F',
        'on-primary-container': '#FFDCE5',
        'primary-fixed': '#FFD9E2',
        'primary-fixed-dim': '#FFB1C8',
        'on-primary-fixed': '#2B0A16',
        'on-primary-fixed-variant': '#6E2748',
        'inverse-primary': '#FFB1C8',
        'surface-tint': '#8E3A5D',

        secondary: '#5F8A6E',
        'on-secondary': '#ffffff',
        'secondary-container': '#CFE4D6',
        'on-secondary-container': '#1C3A26',
        'secondary-fixed': '#CFE4D6',
        'secondary-fixed-dim': '#B3C9B9',
        'on-secondary-fixed': '#0D1F12',
        'on-secondary-fixed-variant': '#3D6650',

        tertiary: '#8C6748',
        'on-tertiary': '#ffffff',
        'tertiary-container': '#F5CFA6',
        'on-tertiary-container': '#2E1C0A',
        'tertiary-fixed': '#F5CFA6',
        'tertiary-fixed-dim': '#D6B48A',
        'on-tertiary-fixed': '#2E1C0A',
        'on-tertiary-fixed-variant': '#5E4530',

        error: '#BA1A1A',
        'on-error': '#ffffff',
        'error-container': '#FFDAD6',
        'on-error-container': '#93000A',

        // Warm cream neutrals (replacing the cool grey scale)
        surface: '#FBF7F6',
        'on-surface': '#251A1D',
        'on-surface-variant': '#4C4044',
        'surface-variant': '#E8DADD',
        'surface-dim': '#DDD6D7',
        'surface-bright': '#FBF7F6',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#F5EEED',
        'surface-container': '#EFE8E7',
        'surface-container-high': '#EBE2E1',
        'surface-container-highest': '#E3DADA',
        'inverse-surface': '#3A2F31',
        'inverse-on-surface': '#F5EEED',
        outline: '#7D6E72',
        'outline-variant': '#D1C2C5',

        background: '#FBF7F6',
        'on-background': '#251A1D',

        'status-safe': '#1F6F43',
        'status-safe-container': '#D6F1DE',
        'status-monitor': '#A36B00',
        'status-monitor-container': '#FDE7B3'
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
