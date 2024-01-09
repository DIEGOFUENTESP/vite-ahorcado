import React, { useState, useEffect } from 'react';
import HangmanDisplay from './HangmanDisplay';
import WordToGuess from './WordToGuess';
import Alphabet from './Alphabet';
import './App.css';

const App = () => {
  const [selectedWord, setSelectedWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState(new Set());
  const [remainingAttempts, setRemainingAttempts] = useState(6);
  const [gameOver, setGameOver] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [hint, setHint] = useState('');

  useEffect(() => {
    let timer;

    if (!gameOver && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => Math.max(prevTime - 1, 0));
      }, 1000);
    } else {
      clearInterval(timer);
      if (timeRemaining === 0) {
        setGameOver(true);
      }
    }

    return () => clearInterval(timer);
  }, [gameOver, timeRemaining]);

  const handleWordSelection = () => {
    setSelectedWord('');
    setGuessedLetters(new Set());
    setRemainingAttempts(6);
    setGameOver(false);
    setUserInput('');
    setTimeRemaining(60);
    setHint(''); // Limpiar la pista al seleccionar una nueva palabra
  };

  const handleUserWordInput = () => {
    setSelectedWord(userInput.toUpperCase());
    setGuessedLetters(new Set());
    setRemainingAttempts(6);
    setGameOver(false);
    setTimeRemaining(60);
  };

  const handleLetterSelection = (letter) => {
    if (gameOver || guessedLetters.has(letter)) {
      return;
    }

    const newGuessedLetters = new Set(guessedLetters);
    newGuessedLetters.add(letter);

    if (!selectedWord.includes(letter)) {
      setRemainingAttempts((prevAttempts) => Math.max(prevAttempts - 1, 0));
    }

    setGuessedLetters(newGuessedLetters);

    if (remainingAttempts <= 1 && !isWordGuessed()) {
      setGameOver(true);
    }
  };

  const isWordGuessed = () => {
    return selectedWord.split('').every((letter) => guessedLetters.has(letter));
  };

  return (
    <div>
      <h1>¡Juego del Ahorcado!</h1>
      {selectedWord ? (
        <div>
          {isWordGuessed() ? (
            <div>
              <p>¡Ganaste!</p>
              <button className='comenzar' onClick={handleWordSelection}>Jugar de nuevo</button>
            </div>
          ) : (
            <div>
              {gameOver && (
                <div>
                  <HangmanDisplay remainingAttempts={remainingAttempts} gameOver={gameOver} />
                  <p className='gamer'>¡Perdiste! La palabra era: {selectedWord}</p>
                  <button className='comenzar' onClick={handleWordSelection}>Jugar de nuevo</button>
                </div>
              )}
              {!gameOver && (
                <div>
                  <HangmanDisplay remainingAttempts={remainingAttempts} />
                  <p className='blue'>Pista: {hint}</p>
                  <WordToGuess selectedWord={selectedWord} guessedLetters={guessedLetters} />                  
                  <Alphabet onLetterSelect={handleLetterSelection} guessedLetters={guessedLetters} />
                  <p>Intentos restantes: {remainingAttempts}</p>
                  <p className='red'>Tiempo restante: {timeRemaining} segundos</p>                  
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value.toUpperCase())}
            placeholder="Ingresa una palabra"
          /><br /><br />
          <input
                    type="text"
                    value={hint}
                    onChange={(e) => setHint(e.target.value)}
                    placeholder="Ingresa una pista"
                  />
          <br /><br /><button className='comenzar' onClick={handleUserWordInput}>Comenzar Juego</button>
        </div>
      )}
    </div>
  );
};

export default App;