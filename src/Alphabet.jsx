import React from 'react';
import './App.css';

const Alphabet = ({ onLetterSelect, guessedLetters }) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div>
      {alphabet.map((letter) => (
        <button className='letras'
          key={letter}
          onClick={() => onLetterSelect(letter)}
          disabled={guessedLetters.has(letter)}
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

export default Alphabet;