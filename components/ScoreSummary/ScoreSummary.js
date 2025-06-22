import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizContext } from '../../context/QuizContext';
import styles from './ScoreSummary.module.css';

const ScoreSummary = () => {
const navigate = useNavigate();
const { player, score, totalTime } = useContext(QuizContext);

// Save score to leaderboard in localStorage
useEffect(() => {
    const leaderboard = JSON.parse(localStorage.getItem('quizLeaderboard')) || [];
    const newEntry = {
        name: player.name,
        score: score,
        time: totalTime,
        category: player.category,
        difficulty: player.difficulty,
        date: new Date().toISOString(),
    };
    
    // Prevent adding empty entries if the page is refreshed
    if (player.name) {
         leaderboard.push(newEntry);
         localStorage.setItem('quizLeaderboard', JSON.stringify(leaderboard));
    }

}, [player, score, totalTime]);


const getMotivationalMessage = () => {
    const percentage = score / 5 * 100; // Assuming 5 questions per quiz
    if (percentage === 100) return "Quiz Champion! Flawless victory!";
    if (percentage >= 80) return "Excellent work! You're a quiz master!";
    if (percentage >= 50) return "Good job! Keep practicing!";
    return "More caffeine, maybe? Better luck next time!";
};

if (!player.name) {
    return (
        <div className={styles.summaryContainer}>
            <h2>No summary to display.</h2>
            <button onClick={() => navigate('/start-quiz')} className={styles.playAgainButton}>
                Start a New Quiz
            </button>
        </div>
    )
}

return (
    <div className={styles.summaryContainer}>
        <div className={styles.trophy}>🏆</div>
        <h2>Quiz Completed, {player.name}!</h2>
        <p className={styles.motivationalMessage}>{getMotivationalMessage()}</p>
        <div className={styles.results}>
            <div className={styles.resultItem}>Final Score: <span>{score}</span></div>
            <div className={styles.resultItem}>Total Time: <span>{totalTime} seconds</span></div>
        </div>
        <button onClick={() => navigate('/start-quiz')} className={styles.playAgainButton}>
            Play Again
        </button>
    </div>
);
};