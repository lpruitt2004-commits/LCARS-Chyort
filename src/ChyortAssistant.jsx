import React from 'react';

export default function ChyortAssistant({ onAsk }) {
  return (
    <div className="chyort-assistant">
      <div className="chyort-avatar">🤖</div>
      <div className="chyort-message">
        <h3>Hello, I’m Chyort!</h3>
        <p>
          I’m your helpful LCARS assistant, happily residing in this Raspberry Pi. If you get stuck or need help accessing information, just ask!
        </p>
        <button className="chyort-ask-btn" onClick={onAsk}>
          Ask Chyort
        </button>
      </div>
    </div>
  );
}
