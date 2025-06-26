import React, { createContext, useState, useEffect, useCallback } from 'react';

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
    const [player, setPlayer] = useState({ name: '', category: '', difficulty: '' });
    const [score, setScore] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    const [theme, setTheme] = useState(() => localStorage.getItem('quizTheme') || 'light');
    const [scoresHistory, setScoresHistory] = useState(() => {
        const savedScores = localStorage.getItem('scoresHistory');
        return savedScores ? JSON.parse(savedScores) : [];
    });
    const [quizLength, setQuizLength] = useState(0);

    useEffect(() => {
        const savedPlayer = localStorage.getItem('quizPlayer');
        if (savedPlayer) {
            setPlayer(JSON.parse(savedPlayer));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('quizPlayer', JSON.stringify(player));
    }, [player]);

    useEffect(() => {
        localStorage.setItem('quizTheme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    useEffect(() => {
        localStorage.setItem('scoresHistory', JSON.stringify(scoresHistory));
    }, [scoresHistory]);

    const addScoreToLeaderboard = useCallback((newScoreEntry) => {
        const updatedScores = [...scoresHistory, newScoreEntry];
        setScoresHistory(updatedScores);
    }, [scoresHistory]);

    const resetQuiz = useCallback(() => {
        setScore(0);
        setTotalTime(0);
        setQuizLength(0);
    }, []);

    const value = {
        player,
        setPlayer,
        score,
        setScore,
        totalTime,
        setTotalTime,
        theme,
        setTheme,
        scoresHistory,
        addScoreToLeaderboard,
        resetQuiz,
        quizLength,
        setQuizLength,
    };

    return (
        <QuizContext.Provider value={value}>
            {children}
        </QuizContext.Provider>
    );
};