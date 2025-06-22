import React, { createContext, useState } from 'react';

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [player, setPlayer] = useState({ name: '', category: '', difficulty: '' });
  const [score, setScore] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  // Load player data from localStorage on initial load
  useState(() => {
      const savedPlayer = localStorage.getItem('quizPlayer');
      if (savedPlayer) {
          setPlayer(JSON.parse(savedPlayer));
      }
  }, []);

  const value = {
    player,
    setPlayer,
    score,
    setScore,
    totalTime,
    setTotalTime
  };

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
};