import React, { useState } from 'react';

export default function ChatWindow({ onNavigate, encyclopediaData }) {
  const [messages, setMessages] = useState([
    { sender: 'chyort', text: 'Hello! I\'m Chyort, your AI assistant! I can help you navigate topics or answer questions. Switch to Code mode for programming help!' }
  ]);
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('chat'); // 'chat' or 'code'
  const [isLoading, setIsLoading] = useState(false);
  const [useAI, setUseAI] = useState(false); // Toggle between AI and keyword mode

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);

    const userInput = input;
    setInput('');

    // If AI mode is enabled, use Ollama API
    if (useAI) {
      setIsLoading(true);
      try {
        const endpoint = mode === 'code' ? '/api/code' : '/api/chat';
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
        const response = await fetch(`${apiUrl}${endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: userInput })
        });

        if (!response.ok) throw new Error('API request failed');

        const data = await response.json();
        const aiMessage = { sender: 'chyort', text: data.response };
        setMessages(prev => [...prev, aiMessage]);
      } catch (error) {
        console.error('AI Error:', error);
        const errorMessage = { 
          sender: 'chyort', 
          text: 'Sorry, I\'m having trouble connecting to my AI brain. Make sure the backend server is running (node server.js) and Ollama is active. Falling back to keyword mode.' 
        };
        setMessages(prev => [...prev, errorMessage]);
        // Fall back to keyword matching
        handleKeywordResponse(userInput);
      } finally {
        setIsLoading(false);
      }
    } else {
      // Use keyword-based navigation
      handleKeywordResponse(userInput);
    }
  };

  const handleKeywordResponse = (lowerInput) => {
    lowerInput = lowerInput.toLowerCase();

    // Process user input
    let response = '';

    // Topic responses - provide information instead of navigating
    const topicResponses = {
      'web-development': 'Web development is the art and science of creating websites and web applications! It involves frontend technologies like HTML, CSS, and JavaScript for building user interfaces, and backend technologies like Node.js, Python, or PHP for server-side logic. Modern web dev also includes frameworks like React, Vue, or Angular. Want to know about a specific aspect?',
      'biology': 'Biology is the fascinating study of life and living organisms! It encompasses everything from molecular biology and genetics to ecology and evolution. Biologists explore how living things function, interact, and adapt to their environments. Topics include cell biology, anatomy, microbiology, and more!',
      'chemistry': 'Chemistry is the science of matter and its transformations! It studies atoms, molecules, and how they interact through chemical reactions. From organic chemistry to biochemistry, it explains everything from why water boils to how medicines work in our bodies.',
      'physics': 'Physics explores the fundamental laws of the universe! It covers motion, energy, forces, quantum mechanics, relativity, and everything from subatomic particles to galaxies. Physics helps us understand how the world works at the most basic level.',
      'computer-science': 'Computer science is the study of computation, algorithms, and information processing! It includes programming, data structures, artificial intelligence, cybersecurity, software engineering, and theoretical computer science. It\'s the foundation of our digital world!',
      'mathematics': 'Mathematics is the language of logic and patterns! It includes algebra, calculus, geometry, statistics, and more. Math is essential for science, engineering, economics, and countless other fields. It\'s about solving problems and understanding relationships between quantities.',
      'history': 'History is the study of past events and their impact on the present! It helps us understand how civilizations developed, why conflicts occurred, and how societies evolved. From ancient Rome to modern times, history gives us perspective on human experience.',
      'geography': 'Geography explores Earth\'s landscapes, peoples, places, and environments! It combines physical geography (landforms, climate, ecosystems) with human geography (cultures, cities, economies). Geography helps us understand our planet and our place in it.',
      'economics': 'Economics studies how societies allocate scarce resources! It includes microeconomics (individual decisions), macroeconomics (national/global economies), and explores topics like supply and demand, markets, trade, and financial systems.',
      'psychology': 'Psychology is the scientific study of mind and behavior! It explores cognition, emotions, personality, development, mental health, and social interactions. Psychologists seek to understand why people think, feel, and act as they do.',
      'political-science': 'Political science examines government systems, political behavior, and public policy! It covers topics like democracy, international relations, political theory, and comparative politics. It helps us understand power structures and governance.',
      'independent-unbiased-journalism': 'Independent journalism is the practice of reporting news with integrity, accuracy, and freedom from external influence! It involves investigative techniques, fact-checking, ethical standards, and commitment to truth. Journalists serve as watchdogs for democracy and inform the public.',
      'journaling': 'Journaling is the personal practice of recording thoughts, experiences, and reflections! It can be therapeutic, creative, or practical. Journaling helps with self-discovery, stress management, goal tracking, and preserving memories.',
      'art': 'Visual art encompasses painting, drawing, sculpture, and other creative visual expressions! It\'s about communicating ideas, emotions, and perspectives through visual media. Art movements, techniques, and styles have evolved throughout human history.',
      'music': 'Music is the art of organizing sound in time! It includes melody, harmony, rhythm, and timbre. From classical to jazz to rock, music is a universal language that expresses emotion and brings people together.',
      'language-arts': 'Language arts covers reading, writing, literature, and communication skills! It includes grammar, composition, literary analysis, and rhetoric. Strong language skills are fundamental to expressing ideas clearly and understanding others.',
      'philosophy': 'Philosophy is the study of fundamental questions about existence, knowledge, ethics, and reality! It includes logic, metaphysics, epistemology, and moral philosophy. Philosophers examine the big questions: What is truth? What is right? What is the meaning of life?',
      'gardening': 'Gardening is the practice of growing and cultivating plants! It includes horticulture, landscaping, organic farming, and botanical knowledge. Gardening can be therapeutic, sustainable, and rewarding - connecting us with nature and providing fresh food.'
    };

    // Check for topic mentions
    let matchedTopic = null;
    
    if (lowerInput.includes('web dev') || lowerInput.includes('html') || lowerInput.includes('css') || lowerInput.includes('javascript')) {
      matchedTopic = 'web-development';
    } else if (lowerInput.includes('biolog')) {
      matchedTopic = 'biology';
    } else if (lowerInput.includes('chemistry') || lowerInput.includes('chem')) {
      matchedTopic = 'chemistry';
    } else if (lowerInput.includes('physics')) {
      matchedTopic = 'physics';
    } else if (lowerInput.includes('computer science') || lowerInput.includes('programming') || lowerInput.includes('coding') || lowerInput.includes('software')) {
      matchedTopic = 'computer-science';
    } else if (lowerInput.includes('math')) {
      matchedTopic = 'mathematics';
    } else if (lowerInput.includes('history') || lowerInput.includes('historical')) {
      matchedTopic = 'history';
    } else if (lowerInput.includes('geography') || lowerInput.includes('geo')) {
      matchedTopic = 'geography';
    } else if (lowerInput.includes('econom')) {
      matchedTopic = 'economics';
    } else if (lowerInput.includes('psycholog')) {
      matchedTopic = 'psychology';
    } else if (lowerInput.includes('politic') || lowerInput.includes('government')) {
      matchedTopic = 'political-science';
    } else if (lowerInput.includes('journalist') || lowerInput.includes('journalism') || lowerInput.includes('reporter') || lowerInput.includes('news')) {
      matchedTopic = 'independent-unbiased-journalism';
    } else if (lowerInput.includes('journal') && !lowerInput.includes('journalism')) {
      matchedTopic = 'journaling';
    } else if ((lowerInput.includes('art') || lowerInput.includes('paint') || lowerInput.includes('draw')) && !lowerInput.includes('language')) {
      matchedTopic = 'art';
    } else if (lowerInput.includes('music')) {
      matchedTopic = 'music';
    } else if (lowerInput.includes('language arts') || lowerInput.includes('literature') || lowerInput.includes('writing')) {
      matchedTopic = 'language-arts';
    } else if (lowerInput.includes('philosoph')) {
      matchedTopic = 'philosophy';
    } else if (lowerInput.includes('garden') || lowerInput.includes('plants')) {
      matchedTopic = 'gardening';
    }

    if (matchedTopic && topicResponses[matchedTopic]) {
      response = topicResponses[matchedTopic];
    } else if (lowerInput.includes('help') || lowerInput.includes('what can you do')) {
      response = 'I\'m Chyort, your friendly AI assistant! In keyword mode, I can chat with you about various topics like science, technology, arts, and more. Switch to AI mode (🤖) for more dynamic conversations powered by Llama 3.2, or switch to Code mode for programming help with CodeLlama!';
    } else if (lowerInput.includes('topic') || lowerInput.includes('subject') || lowerInput.includes('list')) {
      response = 'I can discuss these topics: Biology, Chemistry, Physics, Computer Science, Mathematics, Web Development, History, Geography, Economics, Psychology, Political Science, Art, Music, Language Arts, Philosophy, Gardening, Journaling, and Independent Journalism. What interests you?';
    } else if (lowerInput.includes('hello') || lowerInput.includes('hi ') || lowerInput === 'hi') {
      response = 'Hello! Great to chat with you! What would you like to talk about today?';
    } else if (lowerInput.includes('thank')) {
      response = 'You\'re very welcome! Happy to help anytime!';
    } else {
      response = 'Interesting question! In keyword mode, I can provide information about academic topics. Try asking "tell me about [topic]" or switch to AI mode for more conversational responses!';
    }

    // Add Chyort's response
    const chyortMessage = { sender: 'chyort', text: response };
    setMessages(prev => [...prev, chyortMessage]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSend();
    }
  };

  const toggleMode = () => {
    const newMode = mode === 'chat' ? 'code' : 'chat';
    setMode(newMode);
    const modeMessage = {
      sender: 'chyort',
      text: `Switched to ${newMode === 'code' ? 'Code' : 'Chat'} mode! ${newMode === 'code' ? 'Ask me about programming!' : 'Ask me anything!'}`
    };
    setMessages(prev => [...prev, modeMessage]);
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        Chat with Chyort
        <div className="chat-controls">
          <button 
            className={`mode-toggle ${mode === 'chat' ? 'active' : ''}`}
            onClick={() => mode !== 'chat' && toggleMode()}
          >
            💬 Chat
          </button>
          <button 
            className={`mode-toggle ${mode === 'code' ? 'active' : ''}`}
            onClick={() => mode !== 'code' && toggleMode()}
          >
            💻 Code
          </button>
          <button 
            className={`ai-toggle ${useAI ? 'active' : ''}`}
            onClick={() => setUseAI(!useAI)}
            title={useAI ? 'AI Mode (Ollama)' : 'Keyword Mode'}
          >
            {useAI ? '🤖 AI' : '🔤 Keywords'}
          </button>
        </div>
      </div>
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
          placeholder={isLoading ? "Chyort is thinking..." : `Ask Chyort ${mode === 'code' ? 'about code' : 'anything'}...`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />
        <button 
          className="chat-send-btn" 
          onClick={handleSend}
          disabled={isLoading}
        >
          {isLoading ? '...' : 'Send'}
        </button>
      </div>
    </div>
  );
}
