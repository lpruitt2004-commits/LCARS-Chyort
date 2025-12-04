# Chyort Codex - Multi-Theme System Documentation

## Overview

The Chyort Codex PWA now features a **comprehensive multi-theme system** with 7 distinct visual experiences. Users can seamlessly switch between dramatically different aesthetics without reloading the page, with their preference persisted in localStorage.

## Architecture

### Theme System Components

#### 1. **useTheme Hook** (`src/hooks/useTheme.jsx`)
- React Context-based theme management
- Provides `ThemeProvider` wrapper component
- `useTheme()` hook for accessing current theme
- localStorage integration for persistence
- Exports `AVAILABLE_THEMES` array with all 7 themes

```javascript
// Usage in components
const { theme, setTheme, themes } = useTheme();
```

#### 2. **ThemeToggle Component** (`src/components/ThemeToggle.jsx`)
- Dropdown button for theme selection
- Shows current theme name with 🎨 emoji
- Displays all 7 themes with active state indicator
- Smooth animations and hover effects

#### 3. **Theme CSS Files** (`src/themes/`)
Each theme is a complete CSS stylesheet using CSS custom properties (variables):

```css
[data-theme="cyberpunk"] {
  --primary-color: #00ff00;
  --secondary-color: #ff00ff;
  --accent-color: #00ffff;
  --bg-color: #0a0e27;
  --text-color: #00ff00;
  /* ... more variables ... */
}
```

#### 4. **App Integration** (`src/App.jsx`)
- Wrapped with `<ThemeProvider>` at root level
- All 7 theme CSS files imported
- `<ThemeToggle />` component placed in header
- `data-theme` attribute automatically set on `<html>` element

## The 7 Themes

### 1. **Cyberpunk Neon** 🟢
**Aesthetic**: Matrix-style hacker terminal with authentic CRT effects

- **Colors**: Neon green (#00ff00), Magenta (#ff00ff), Cyan (#00ffff)
- **Effects**: Scanline animation, glitch text effect
- **Font**: Courier New, Monaco monospace
- **Vibe**: Classic hacker / cyberpunk terminal

**Key Features**:
- Animated scanlines moving down the screen (8s loop)
- Neon glow on all text and elements
- Magenta/cyan text shadows for glitch effect
- Sharp 90s cyberpunk aesthetic

### 2. **Gaming Dashboard** 🎮
**Aesthetic**: Modern esports HUD (Valorant/Fortnite style)

- **Colors**: Red (#ff1744), Gold (#ffd600), Cyan (#00e5ff)
- **Effects**: Holographic overlay, glowing corners, flash animations
- **Font**: Arial, system sans-serif
- **Vibe**: Professional gaming interface

**Key Features**:
- Holographic radial gradient overlay
- Glowing corner brackets on cards
- Shimmer effect on buttons
- Team-based color coding (user vs assistant)

### 3. **Glassmorphism** 💎
**Aesthetic**: Premium frosted glass design with depth layers

- **Colors**: Indigo (#6366f1), Purple (#a78bfa), Pink (#f0abfc)
- **Effects**: Backdrop blur, depth layering, smooth transitions
- **Font**: System fonts (-apple-system, Segoe UI)
- **Vibe**: Modern, premium, accessible

**Key Features**:
- 20px backdrop blur on all cards
- Layered shadow and inset glow
- Smooth cubic-bezier animations (0.3s)
- Gradient text on headings

### 4. **Retro Arcade** 🎯
**Aesthetic**: 80s arcade cabinet meets modern design

- **Colors**: Hot pink (#ff006e), Yellow (#ffbe0b), Cyan (#08f7fe)
- **Effects**: Pixel grids, 3D depth shadows, cabinet styling
- **Font**: Press Start 2P (fallback Courier New)
- **Vibe**: Nostalgic 80s arcade energy

**Key Features**:
- Pixel grid background pattern
- Bold 3D offset shadows (drop shadow effect)
- Thick borders and chunky buttons
- Retro color scheme with modern polish

### 5. **Minimalist Bold** ⚫⚪
**Aesthetic**: Typography-focused brutalist design

- **Colors**: Black (#000000), White (#ffffff), Gray (#333333)
- **Effects**: Large typography, strong borders, geometric shapes
- **Font**: Georgia serif, Arial sans-serif
- **Vibe**: Print magazine, editorial, brutalist

**Key Features**:
- Massive 5rem headings with -2px letter-spacing
- 3px solid borders throughout
- Box shadow offset for depth (12px shadow)
- Clean, readable, professional

### 6. **Liquid Organic** 🌊
**Aesthetic**: Flowing organic shapes with animated gradients

- **Colors**: Hot pink (#ff006e), Purple (#8338ec), Blue (#3a86ff)
- **Effects**: Blob morphing animations, flowing transitions, gradient animation
- **Font**: Inter, system sans-serif
- **Vibe**: Modern, smooth, organic

**Key Features**:
- Animated gradient background (15s gradientShift animation)
- Blob morphing shapes (8s blobMove animation)
- Smooth cubic-bezier animations (0.34, 1.56, 0.64, 1)
- Floating text animation (6s float)

### 7. **Terminal TUI** 🖥️
**Aesthetic**: Classic green-screen terminal interface

- **Colors**: Lime green (#00ff00), Yellow (#ffff00), Cyan (#00ffff)
- **Effects**: Scanlines, terminal window borders, ANSI styling
- **Font**: Courier New, Monaco, Menlo monospace
- **Vibe**: Retro Unix/Linux terminal

**Key Features**:
- Terminal-style window borders (┌─┐│└─┘)
- Terminal prompt prefixes ($ for titles, > for content)
- Bracket notation for buttons ([ Button ])
- Green screen classic CRT look

## CSS Custom Properties

All themes use a consistent set of CSS variables for flexibility:

```css
--primary-color: Primary brand color
--primary-rgb: RGB values of primary (for rgba usage)
--secondary-color: Secondary accent color
--accent-color: Tertiary accent color
--bg-color: Main background
--bg-secondary: Secondary background
--text-color: Primary text color
--text-secondary: Secondary text color
--border-color: Border color
--dropdown-bg: Dropdown background (for theme selector)
```

## Usage

### Switching Themes

Users click the 🎨 button in the header to open the theme dropdown and select their preferred theme.

```
┌─────────────────────────────────────┐
│ LCARS Terminal UI  │  🎨 Cyberpunk  │
└─────────────────────────────────────┘
```

### Programmatic Theme Change

```javascript
import { useTheme } from './hooks/useTheme.jsx';

function MyComponent() {
  const { setTheme } = useTheme();
  
  return (
    <button onClick={() => setTheme('gaming')}>
      Switch to Gaming
    </button>
  );
}
```

## Storage

Theme preference is saved in `localStorage` under the key `theme`:

```javascript
localStorage.setItem('theme', 'cyberpunk');
const savedTheme = localStorage.getItem('theme'); // 'cyberpunk'
```

The theme is automatically restored when the user revisits the site.

## Responsive Design

All themes are fully responsive and work on:
- ✅ Mobile devices (320px+)
- ✅ Tablets (768px+)
- ✅ Desktops (1024px+)
- ✅ Ultra-wide displays (1440px+)

## Animation Performance

### GPU-Accelerated Animations
- Scanline effects use CSS animations (minimal CPU)
- Blob morphs use border-radius transforms
- Transitions use `transform` and `opacity` for GPU acceleration

### Browser Support
- ✅ Chrome/Edge (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Mobile browsers

## Adding a New Theme

To add a new theme, follow this pattern:

### 1. Create `src/themes/mytheme.css`
```css
[data-theme="mytheme"] {
  --primary-color: #color1;
  --secondary-color: #color2;
  --accent-color: #color3;
  --bg-color: #bgcolor;
  --bg-secondary: #bgcolor2;
  --text-color: #textcolor;
  --text-secondary: #textcolor2;
  --border-color: #bordercolor;
  --dropdown-bg: rgba(color, 0.95);
}

[data-theme="mytheme"] body {
  background: /* your background */;
  color: var(--text-color);
  font-family: /* your font */;
}

/* Add all component styles using data-theme selector */
```

### 2. Update `src/hooks/useTheme.jsx`
```javascript
export const AVAILABLE_THEMES = [
  // ... existing themes ...
  { id: 'mytheme', name: 'My Theme' },
];
```

### 3. Import in `src/App.jsx`
```javascript
import './themes/mytheme.css';
```

That's it! The theme will automatically appear in the dropdown.

## Performance Metrics

- **Theme Switch Time**: < 50ms (instant visual feedback)
- **CSS File Sizes**:
  - Cyberpunk: 5.66 KB
  - Gaming: 5.73 KB
  - Glassmorphism: 5.07 KB
  - Arcade: 6.11 KB
  - Minimalist: 4.64 KB
  - Liquid: 6.74 KB
  - Terminal: 6.42 KB
  - **Total**: ~41 KB (compresses to ~8-10 KB gzipped)

- **localStorage Impact**: < 100 bytes (just storing theme ID)

## Future Enhancements

- [ ] Theme preview in dropdown
- [ ] Custom color picker for theme customization
- [ ] User-created theme sharing
- [ ] Dark/light mode detection
- [ ] Animated theme transition effects
- [ ] System theme preference detection (prefers-color-scheme)
- [ ] Per-page theme overrides
- [ ] Theme-specific fonts CDN loading

## Troubleshooting

### Theme not applying?
1. Check browser console for CSS import errors
2. Verify `data-theme` attribute on `<html>` element
3. Clear localStorage and refresh: `localStorage.clear()`

### Theme dropdown not showing?
1. Check `src/components/ThemeToggle.jsx` is imported in App.jsx
2. Verify `<ThemeToggle />` is placed inside the `<ThemeProvider>`

### Custom theme not working?
1. Ensure theme ID is added to `AVAILABLE_THEMES` array
2. Check CSS file is imported in App.jsx
3. Verify CSS uses `[data-theme="yourtheme"]` selector
4. Confirm all required CSS variables are defined

## Credits

Multi-theme system designed for Chyort Codex PWA to provide maximum aesthetic flexibility across different use cases:

- **Cyberpunk**: For the classic hacker aesthetic
- **Gaming**: For esports/competitive gaming interface
- **Glassmorphism**: For premium, modern web experiences
- **Arcade**: For retro gaming nostalgia
- **Minimalist**: For clean, editorial content focus
- **Liquid**: For dynamic, smooth organic feel
- **Terminal**: For command-line interface familiarity
