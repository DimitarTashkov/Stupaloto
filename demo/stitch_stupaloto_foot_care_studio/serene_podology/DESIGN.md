---
name: Serene Podology
colors:
  surface: '#f8faf8'
  surface-dim: '#d8dad9'
  surface-bright: '#f8faf8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f2'
  surface-container: '#eceeec'
  surface-container-high: '#e6e9e7'
  surface-container-highest: '#e1e3e1'
  on-surface: '#191c1b'
  on-surface-variant: '#3f4941'
  inverse-surface: '#2e3130'
  inverse-on-surface: '#eff1ef'
  outline: '#6f7a70'
  outline-variant: '#bec9be'
  surface-tint: '#096d3d'
  primary: '#096d3d'
  on-primary: '#ffffff'
  primary-container: '#58ad77'
  on-primary-container: '#003d1f'
  inverse-primary: '#82d99f'
  secondary: '#2c694b'
  on-secondary: '#ffffff'
  secondary-container: '#b0f1ca'
  on-secondary-container: '#337051'
  tertiary: '#5b5b7c'
  on-tertiary: '#ffffff'
  tertiary-container: '#9a99bd'
  on-tertiary-container: '#31314f'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#9ef5b9'
  primary-fixed-dim: '#82d99f'
  on-primary-fixed: '#00210f'
  on-primary-fixed-variant: '#00522c'
  secondary-fixed: '#b0f1ca'
  secondary-fixed-dim: '#95d4af'
  on-secondary-fixed: '#002112'
  on-secondary-fixed-variant: '#0e5135'
  tertiary-fixed: '#e1dfff'
  tertiary-fixed-dim: '#c4c3e9'
  on-tertiary-fixed: '#181935'
  on-tertiary-fixed-variant: '#444463'
  background: '#f8faf8'
  on-background: '#191c1b'
  surface-variant: '#e1e3e1'
typography:
  display-lg:
    fontFamily: Quicksand
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Quicksand
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Quicksand
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  title-md:
    fontFamily: Quicksand
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Quicksand
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Quicksand
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Quicksand
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1200px
  gutter: 24px
---

## Brand & Style
The design system is centered on a "Wellness-First" philosophy, specifically tailored for a podology and nail care studio. The brand personality is nurturing, professional, and tranquil, moving away from the sterile, cold atmosphere of traditional medical clinics toward a warm, "spa-like" sanctuary.

The target audience seeks both therapeutic care and aesthetic rejuvenation. To evoke a sense of relief and calm, the design style utilizes a **Soft Modernism** approach. This combines generous whitespace, organic shapes, and a gentle tactile quality. The UI should feel airy and breathable, mirroring the physical sensation of lightness following a treatment. Nature-inspired motifs, such as subtle leaf silhouettes or flowing water-like curves, should be used sparingly as background elements to reinforce the connection to natural health.

## Colors
The palette is rooted in botanical greens to symbolize healing and growth. 
- **Primary Green (#58AD77):** Used for call-to-action buttons, active states, and key brand markers. 
- **Secondary Mint (#90CFAA):** Applied to large surface areas and secondary accents to soften the visual weight.
- **Lavender (#B7B6DB) & Pink (#EAAFCF):** These soft accents are used for specific service categories (e.g., Lavender for relaxation treatments, Pink for aesthetic nail care) and subtle highlights.
- **Backgrounds:** Use a very light off-white with a hint of mint (#F7F9F7) to reduce screen glare and maintain the "spa" atmosphere. Pure white should be reserved for card surfaces to create subtle contrast.

## Typography
This design system utilizes **Quicksand** exclusively to leverage its rounded terminals, which project a friendly and approachable character. 

- **Headlines:** Set in SemiBold or Bold weights with slightly tighter letter spacing to create a modern, high-end editorial feel.
- **Body Text:** Set in Regular weight with generous line height (1.5x) to ensure maximum readability and a feeling of "openness."
- **Visual Hierarchy:** Use color (Primary Green) for key headlines to establish brand presence, while keeping body text in a deep charcoal green (#2D3A31) rather than pure black for a softer look.

## Layout & Spacing
The layout follows a **Fluid Grid** model that prioritizes whitespace to evoke a sense of luxury and calm.

- **Desktop:** 12-column grid with 24px gutters and wide 80px side margins to "center" the content experience.
- **Mobile:** Single column with 20px side margins. 
- **Spacing Rhythm:** Use a 8px linear scale. Section vertical spacing should be aggressive (e.g., 80px to 120px) to prevent the UI from feeling cluttered. Elements within a group should use 24px (md) spacing to maintain clear relationships without feeling cramped.

## Elevation & Depth
Depth is achieved through **Soft Tonal Layering** rather than heavy shadows.

- **Surface Tiers:** The base background is the off-white mint. Cards and interactive containers use pure white (#FFFFFF).
- **Shadows:** Use extremely diffused "Ambient Shadows." A typical shadow should have a large blur (32px+) and low opacity (5-8%), tinted with the Primary Green color rather than gray to keep the palette harmonious.
- **Depth Levels:**
  - Level 0: Background.
  - Level 1: Elevated cards (Service descriptions, booking forms).
  - Level 2: Interactive elements on hover or Modals.

## Shapes
The shape language is organic and soft, avoiding sharp corners entirely to mirror the natural curves found in nature and the human form.

- **Standard Radius:** 16px for most components like input fields and small cards.
- **Large Radius:** 32px or 48px for hero sections and large container backgrounds to create a "contained" and safe feeling.
- **Buttons:** Fully pill-shaped (rounded-full) to emphasize the friendly, tactile nature of the brand.

## Components
Consistent component styling ensures the design system feels cohesive and trustworthy.

- **Buttons:** Primary buttons are pill-shaped with the Primary Green background and white text. Secondary buttons use a Primary Green border with a soft mint background.
- **Service Cards:** Use a white background, 24px padding, and 16px corner radius. Include a subtle 2px border in a very light mint color to define the shape without adding visual weight.
- **Input Fields:** Soft 12px rounded corners with a 1px border in Secondary Green. Focus states should use a soft outer glow in the accent Lavender color.
- **Chips/Badges:** Used for service categories (e.g., "Medical," "Aesthetic"). These should be pill-shaped with low-opacity background fills using the Accent colors (Lavender or Pink).
- **Booking Calendar:** A custom component with rounded date pickers, utilizing the Primary Green for the selected date and soft transitions between months.
- **Care Icons:** Use line-art style icons with rounded caps and joins, colored in Primary Green, to maintain the modern and friendly aesthetic.