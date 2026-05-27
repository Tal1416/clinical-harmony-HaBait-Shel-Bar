---
name: Women's Health Design System
colors:
  surface: '#f8f9fa'
  surface-dim: '#d8dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f5'
  surface-container: '#eceeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#3e494a'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#eff1f2'
  outline: '#6e797a'
  outline-variant: '#bdc9ca'
  surface-tint: '#006970'
  primary: '#006168'
  on-primary: '#ffffff'
  primary-container: '#0d7c84'
  on-primary-container: '#d9fcff'
  inverse-primary: '#7cd4dd'
  secondary: '#5f5982'
  on-secondary: '#ffffff'
  secondary-container: '#d4ccfc'
  on-secondary-container: '#5b557d'
  tertiary: '#57575e'
  on-tertiary: '#ffffff'
  tertiary-container: '#706f77'
  on-tertiary-container: '#f7f3fc'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#98f1f9'
  primary-fixed-dim: '#7cd4dd'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f54'
  secondary-fixed: '#e5deff'
  secondary-fixed-dim: '#c9c1f0'
  on-secondary-fixed: '#1c163b'
  on-secondary-fixed-variant: '#474269'
  tertiary-fixed: '#e4e1ea'
  tertiary-fixed-dim: '#c8c5ce'
  on-tertiary-fixed: '#1b1b21'
  on-tertiary-fixed-variant: '#46464d'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  headline-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Manrope
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Atkinson Hyperlegible Next
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Atkinson Hyperlegible Next
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Atkinson Hyperlegible Next
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: Atkinson Hyperlegible Next
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
  data-mono:
    fontFamily: Atkinson Hyperlegible Next
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-padding-mobile: 16px
  container-padding-desktop: 40px
  gutter: 24px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

This design system is built upon the pillars of **Clinical Authority** and **Empathetic Care**. It balances the precision required for medical data with the softness necessary for a supportive patient experience. 

The visual style follows a **Modern Corporate** aesthetic with **Minimalist** influences. By prioritizing generous white space and a soft, rhythmic layout, the system reduces cognitive load for users navigating complex health information. The interface should feel like a "calm room"—organized, quiet, and trustworthy. We avoid aggressive design trends in favor of timeless, accessible patterns that signal reliability and safety.

## Colors

The palette is centered on a **Clinical Teal** (Primary) to establish authority and a **Warm Lavender** (Secondary) to introduce empathy and a feminine touch without relying on clichés. 

### Accessibility & Contrast
All primary actions and text must meet WCAG 2.1 AA standards. The neutral palette uses a slightly warmed charcoal rather than pure black to maintain a softer tone.

### Status Indicators
- **Safe:** A deep botanical green, distinct from the primary teal to ensure clarity in medical contexts.
- **Monitor:** A high-contrast ochre used for non-urgent observations.
- **Alert:** A clear, authoritative red used sparingly for critical health notifications.

## Typography

Typography is the cornerstone of this design system's accessibility. We utilize **Manrope** for headlines to provide a modern, balanced, and professional appearance. For all body copy, medical results, and labels, we use **Atkinson Hyperlegible Next**. This font is specifically designed to increase character recognition and improve legibility for users with low vision.

### Data Display
When displaying medical metrics (e.g., blood pressure, lab values), use the `data-mono` or `body-md` bold weights to ensure numbers are easily distinguishable from surrounding descriptive text.

## Layout & Spacing

The layout employs a **Fluid Grid** system that prioritizes readability over density. 

- **Desktop:** 12-column grid with a 1200px max-width container.
- **Tablet:** 8-column grid with 24px margins.
- **Mobile:** 4-column grid with 16px margins.

Spacing follows an 8px linear scale. Vertical rhythm is critical for medical forms; use `stack-md` (16px) between related input fields and `stack-lg` (32px) between distinct sections to prevent the UI from feeling cramped or overwhelming.

## Elevation & Depth

To maintain a clean and professional aesthetic, this design system uses **Tonal Layers** and **Ambient Shadows** rather than heavy borders.

1.  **Level 0 (Base):** Background base (`#FFFFFF`).
2.  **Level 1 (Cards/Surface):** Used for primary content containers. These use a subtle 1px border in a very light neutral tint or a soft, highly diffused shadow (Blur: 12px, Y: 4px, Opacity: 4% Black).
3.  **Level 2 (Overlays):** Modals and dropdowns use a more pronounced shadow to create focus (Blur: 24px, Y: 8px, Opacity: 8% Black).

Avoid using inner shadows or heavy neomorphic effects, as these can detract from the legibility of clinical data.

## Shapes

The shape language is **Rounded**, utilizing a 0.5rem (8px) base radius. This choice is intentional: it softens the "cold" clinical feel of traditional healthcare apps, making the interface feel more approachable and supportive. 

- **Standard Elements:** 8px (Buttons, Input Fields, Small Cards).
- **Large Containers:** 16px (Large Content Cards, Modals).
- **Interactive Pills:** Full round (Chips, Status Tags).

## Components

### Buttons
- **Primary:** Solid Teal background with White text. High contrast for immediate visibility.
- **Secondary:** Lavender outline with Lavender text. Used for supportive actions.
- **Ghost:** Teal text with no background. Used for low-priority navigation.

### Input Fields
Inputs must have a minimum height of 48px for touch accessibility. They feature a 1px neutral border that thickens to 2px Primary Teal on focus. Error states must include both a red border and an icon for accessibility.

### Cards
Cards are the primary container for health data. Use generous padding (24px) and clear `headline-sm` titles. When a card represents a health status, a 4px vertical "status bar" can be added to the left edge using the Safe, Monitor, or Alert colors.

### Status Chips
Pill-shaped badges with low-opacity backgrounds and high-contrast text. For example, a "Safe" chip uses a light green background with the `status_safe` dark green text.

### Progress Indicators
Step-based indicators for medical onboarding or health goals should use soft, rounded lines rather than sharp points to maintain the supportive visual narrative.