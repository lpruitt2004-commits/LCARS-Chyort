import React, { useState } from 'react';

export default function ChatWindow({ onNavigate, encyclopediaData }) {
  const [messages, setMessages] = useState([
    { sender: 'chyort', text: 'Hello! I\'m Chyort. Ask me about any encyclopedia topic, or request to navigate to a specific section!' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);

    // Process user input
    const lowerInput = input.toLowerCase();
    let response = '';

    // Check for navigation requests - more specific matching
    const topicMap = {
      'biology': ['biology', 'bio', 'life science'],
      'chemistry': ['chemistry', 'chem', 'chemical'],
      'physics': ['physics', 'physical science'],
      'computer-science': ['computer science', 'computer-science', 'programming', 'coding', 'software'],
      'mathematics': ['mathematics', 'math', 'maths', 'algebra', 'calculus'],
      'web-development': ['web development', 'web-development', 'web dev', 'html', 'css', 'javascript'],
      'history': ['history', 'historical'],
      'geography': ['geography', 'geo'],
      'economics': ['economics', 'economy', 'economic'],
      'psychology': ['psychology', 'psych'],
      'political-science': ['political science', 'political-science', 'politics', 'government'],
      'art': ['art', 'arts', 'visual art', 'painting', 'drawing'],
      'music': ['music', 'musical'],
      'language-arts': ['language arts', 'language-arts', 'literature', 'writing', 'grammar'],
      'philosophy': ['philosophy', 'philosophical'],
      'gardening': ['gardening', 'garden', 'plants', 'horticulture'],
      'journaling': ['journaling', 'journal'],
      'independent-unbiased-journalism': ['journalism', 'independent journalism', 'unbiased journalism', 'reporter', 'news']
    };

    let matchedTopic = null;
    
    // Find best match - check for exact keyword matches
    for (const [topic, keywords] of Object.entries(topicMap)) {
      if (keywords.some(keyword => lowerInput.includes(keyword))) {
        matchedTopic = topic;
        break;
      }
    }

    if (matchedTopic) {
      response = `Navigating to ${matchedTopic.replace(/-/g, ' ')}...`;
      setTimeout(() => onNavigate(matchedTopic), 500);
    } else if (lowerInput.includes('help') || lowerInput.includes('what can you do')) {
      response = 'I can help you navigate the encyclopedia! Just mention any topic like "biology", "chemistry", or ask me questions about the available subjects.';
    } else if (lowerInput.includes('topic') || lowerInput.includes('subject') || lowerInput.includes('list')) {
      response = 'Available topics: Biology, Chemistry, Physics, Computer Science, Mathematics, Web Development, History, Geography, Economics, Psychology, Political Science, Art, Music, Language Arts, Philosophy, Gardening, Journaling, and Independent Unbiased Journalism.';
    } else if (lowerInput.includes('what') || lowerInput.includes('how') || lowerInput.includes('need')) {
      response = 'Great question! Please specify which topic you\'re interested in, or say "list topics" to browse all available subjects. You can also ask me to navigate to a specific area like "show me journalism" or "tell me about biology".';
    } else {
      response = 'I\'m here to help! Try asking about a specific topic, or say "list topics" to see what\'s available.';
    }

    // Add Chyort's response
    const chyortMessage = { sender: 'chyort', text: response };
    setMessages(prev => [...prev, chyortMessage]);

    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">Chat with Chyort</div>
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-message ${msg.sender}`}>
            <span className="chat-sender">{msg.sender === 'chyort' ? '🤖 Chyort' : 'You'}:</span>
            <span className="chat-text">{msg.text}</span>
          </div>
        ))}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          placeholder="Ask Chyort about topics or navigation..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="chat-send-btn" onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
