import React from 'react';

const HangmanDisplay = ({ remainingAttempts, gameOver }) => {
  const parts = [
    <circle key="head" cx="50" cy="30" r="15" fill="#ff0000" />,
    <line key="body" x1="50" y1="45" x2="50" y2="85" stroke="#ff0000" strokeWidth="4" />,
    <line key="left-arm" x1="50" y1="50" x2="30" y2="70" stroke="#ff0000" strokeWidth="4" />,
    <line key="right-arm" x1="50" y1="50" x2="70" y2="70" stroke="#ff0000" strokeWidth="4" />,
    <line key="left-leg" x1="50" y1="85" x2="40" y2="105" stroke="#ff0000" strokeWidth="4" />,
    <line key="right-leg" x1="50" y1="85" x2="60" y2="105" stroke="#ff0000" strokeWidth="4" />,
  ];

  const visibleParts = gameOver ? parts : parts.slice(0, parts.length - remainingAttempts);

  return (
    <svg height="150" width="120" style={{ marginTop: '20px' }}>
      {parts.map((part, index) => (
        <g key={index} style={{ visibility: visibleParts.includes(part) ? 'visible' : 'hidden' }}>
          {part}
        </g>
      ))}
    </svg>
  );
};

export default HangmanDisplay;