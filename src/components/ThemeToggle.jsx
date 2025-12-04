import React, { useState } from 'react';
import { useTheme } from '../hooks/useTheme.jsx';
import './ThemeToggle.css';

export function ThemeToggle() {
  const { theme, setTheme, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const currentThemeName = themes.find(t => t.id === theme)?.name || 'Theme';

  return (
    <div className="theme-toggle-container">
      <button 
        className="theme-toggle-button"
        onClick={() => setIsOpen(!isOpen)}
        title="Switch Theme"
      >
        🎨 {currentThemeName}
      </button>
      
      {isOpen && (
        <div className="theme-dropdown">
          {themes.map((t) => (
            <button
              key={t.id}
              className={`theme-option ${theme === t.id ? 'active' : ''}`}
              onClick={() => {
                setTheme(t.id);
                setIsOpen(false);
              }}
            >
              {t.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
