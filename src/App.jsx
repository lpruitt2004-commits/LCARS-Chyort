import React, { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import './App.css';
import ChyortAssistant from './ChyortAssistant';
import EncyclopediaNav from './EncyclopediaNav';

function App() {
  const [currentSection, setCurrentSection] = useState(null);
  const [markdownContent, setMarkdownContent] = useState('');

  // Handler for Chyort help
  const handleAskChyort = () => {
    alert('Chyort: How can I assist you? You can browse the encyclopedia or ask for help with code or chat.');
  };

  // Handler for selecting encyclopedia section
  const handleSelectSection = async (sectionId) => {
    setCurrentSection(sectionId);
    
    // Load markdown file
    try {
      const response = await fetch(`/encyclopedia/${sectionId}.md`);
      const text = await response.text();
      setMarkdownContent(text);
    } catch (error) {
      setMarkdownContent('# Error\n\nCould not load content.');
    }
  };

  return (
    <div className="lcars-container">
      <div className="lcars-header">LCARS Terminal UI</div>
      <div className="lcars-side-bar left"></div>
      <div className="lcars-main-content">
        <ChyortAssistant onAsk={handleAskChyort} />
        <EncyclopediaNav onSelectSection={handleSelectSection} />
        {currentSection && (
          <div className="encyclopedia-section">
            <Markdown>{markdownContent}</Markdown>
            <button onClick={() => setCurrentSection(null)} className="chyort-ask-btn">
              Back to Table of Contents
            </button>
          </div>
        )}
      </div>
      <div className="lcars-side-bar right"></div>
      <div className="lcars-footer">Star Trek LCARS Demo</div>
    </div>
  );
}

export default App;
