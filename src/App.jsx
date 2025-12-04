import React, { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import './App.css';
import ChyortAssistant from './ChyortAssistant';
import EncyclopediaNav from './EncyclopediaNav';
import ChatWindow from './ChatWindow';

function App() {
  const [currentSection, setCurrentSection] = useState(null);
  const [markdownContent, setMarkdownContent] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'encyclopedia', 'chat'

  // Handler for Chyort help
  const handleAskChyort = () => {
    setActiveTab('chat');
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
        
        {/* Navigation Tabs */}
        <div className="main-tabs">
          <button 
            className={`main-tab ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            🏠 Home
          </button>
          <button 
            className={`main-tab ${activeTab === 'encyclopedia' ? 'active' : ''}`}
            onClick={() => setActiveTab('encyclopedia')}
          >
            📚 Encyclopedia
          </button>
          <button 
            className={`main-tab ${activeTab === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveTab('chat')}
          >
            💬 Chat with Chyort
          </button>
        </div>

        {/* Home Tab */}
        {activeTab === 'home' && (
          <div className="tab-content">
            <ChyortAssistant onAsk={handleAskChyort} />
          </div>
        )}

        {/* Encyclopedia Tab */}
        {activeTab === 'encyclopedia' && (
          <div className="tab-content">
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
        )}

        {/* Chat Tab */}
        {activeTab === 'chat' && (
          <div className="tab-content">
            <ChatWindow onNavigate={handleSelectSection} />
          </div>
        )}

      </div>
      <div className="lcars-side-bar right"></div>
      <div className="lcars-footer">Star Trek LCARS Demo</div>
    </div>
  );
}

export default App;
