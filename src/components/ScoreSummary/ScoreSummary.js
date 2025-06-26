import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizContext } from '../../context/QuizContext';
import styles from './ScoreSummary.module.css';

const ScoreSummary = () => {
  const navigate = useNavigate();
  const { 
    player, 
    score, 
    totalTime, 
    quizLength, 
    addScoreToLeaderboard, 
    resetQuiz 
  } = useContext(QuizContext);

  useEffect(() => {
    if (player.name && quizLength > 0) {
      const newEntry = {
        name: player.name,
        score: score,
        time: totalTime,
        category: player.category,
        difficulty: player.difficulty,
        date: new Date().toISOString(),
      };
      addScoreToLeaderboard(newEntry);
    }
    // This effect should only run once when the component mounts.
    // We disable the linting rule because its dependencies would cause re-runs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getMotivationalMessage = () => {
    if (quizLength === 0) return "Great effort!";
    const percentage = (score / quizLength) * 100;
    if (percentage === 100) return "Quiz Champion! Flawless victory!";
    if (percentage >= 80) return "Excellent work! You're a quiz master!";
    if (percentage >= 50) return "Good job! Keep practicing!";
    return "More caffeine, maybe? Better luck next time!";
  };

  const handlePlayAgain = () => {
    resetQuiz();
    navigate('/start-quiz');
  };

  if (!player.name || quizLength === 0) {
    return (
      <div className={styles.summaryContainer}>
        <h2>No summary to display.</h2>
        <button onClick={() => navigate('/start-quiz')} className={styles.playAgainButton}>
          Start a New Quiz
        </button>
      </div>
    );
  }

  return (
    <div className={styles.summaryContainer}>
      <div className={styles.trophy}>🏆</div>
      <h2>Quiz Completed, {player.name}!</h2>
      <p className={styles.motivationalMessage}>{getMotivationalMessage()}</p>
      <div className={styles.results}>
        <div className={styles.resultItem}>
          Final Score: <span>{score} / {quizLength}</span>
        </div>
        <div className={styles.resultItem}>
          Total Time: <span>{totalTime} seconds</span>
        </div>
      </div>
      <button onClick={handlePlayAgain} className={styles.playAgainButton}>
        Play Again
      </button>
    </div>
  );
};

export default ScoreSummary;