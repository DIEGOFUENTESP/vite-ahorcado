import React from 'react';

const WordToGuess = ({ selectedWord, guessedLetters }) => {
  if (!selectedWord) {
    console.error('selectedWord is undefined');
    return null;
  }

  const displayWord = selectedWord
    .split('')
    .map((letter, index) => (guessedLetters.has(letter) ? letter : '_'))
    .join(' ');

  const allGuessedLetters = Array.from(guessedLetters).join(' ');

  return (
    <div>
      <p>{displayWord}</p>
      <p>Letras utilizadas: {allGuessedLetters}</p>
    </div>
  );
};

export default WordToGuess;