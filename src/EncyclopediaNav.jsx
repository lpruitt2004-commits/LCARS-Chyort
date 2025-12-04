import React, { useState } from 'react';

const sections = [
  { id: 'biology', title: 'Biology' },
  { id: 'chemistry', title: 'Chemistry' },
  { id: 'web-development', title: 'Web Development' },
  { id: 'gardening', title: 'Gardening' },
  { id: 'mathematics', title: 'Mathematics' },
  { id: 'language-arts', title: 'Language Arts' },
  { id: 'philosophy', title: 'Philosophy' },
  { id: 'journaling', title: 'Journaling' },
  { id: 'independent-unbiased-journalism', title: 'Independent Unbiased Journalism' },
  { id: 'physics', title: 'Physics' },
  { id: 'computer-science', title: 'Computer Science' },
  { id: 'history', title: 'History' },
  { id: 'geography', title: 'Geography' },
  { id: 'art', title: 'Art' },
  { id: 'music', title: 'Music' },
  { id: 'economics', title: 'Economics' },
  { id: 'psychology', title: 'Psychology' },
  { id: 'political-science', title: 'Political Science' },
];

export default function EncyclopediaNav({ onSelectSection }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="encyclopedia-nav">
      <h3>Encyclopedia Table of Contents</h3>
      <div className="encyclopedia-tabs">
        {sections.map(sec => (
          <button
            key={sec.id}
            className={`encyclopedia-tab${selected === sec.id ? ' active' : ''}`}
            onClick={() => {
              setSelected(sec.id);
              onSelectSection(sec.id);
            }}
          >
            {sec.title}
          </button>
        ))}
      </div>
    </div>
  );
}
