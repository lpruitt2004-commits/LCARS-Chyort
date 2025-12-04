import React, { useState, useEffect, createContext, useContext } from 'react';

// Create Theme Context
const ThemeContext = createContext();

// Available themes
export const AVAILABLE_THEMES = [
  { id: 'cyberpunk', name: 'Cyberpunk Neon' },
  { id: 'gaming', name: 'Gaming Dashboard' },
  { id: 'glassmorphism', name: 'Glassmorphism' },
  { id: 'arcade', name: 'Retro Arcade' },
  { id: 'minimalist', name: 'Minimalist Bold' },
  { id: 'liquid', name: 'Liquid Organic' },
  { id: 'terminal', name: 'Terminal TUI' },
];

// ThemeProvider Component
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Get theme from localStorage or default to cyberpunk
    return localStorage.getItem('theme') || 'cyberpunk';
  });

  // Update localStorage and DOM when theme changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const value = {
    theme,
    setTheme,
    themes: AVAILABLE_THEMES,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// useTheme Hook
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
