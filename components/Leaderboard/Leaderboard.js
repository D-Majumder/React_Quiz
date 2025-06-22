import React, { useState, useEffect, useMemo } from 'react';
import styles from './Leaderboard.module.css';

const Leaderboard = () => {
    const [scores, setScores] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'score', direction: 'descending' });

    useEffect(() => {
        const loadedScores = JSON.parse(localStorage.getItem('quizLeaderboard')) || [];
        setScores(loadedScores);
    }, []);

    const sortedScores = useMemo(() => {
        let sortableItems = [...scores];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [scores, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        if (key === 'score') direction = 'descending'; // Default score to high-to-low
        if (key === 'time') direction = 'ascending'; // Default time to low-to-high

        setSortConfig({ key, direction });
    };

    return (
        <div className={styles.leaderboardContainer}>
            <h1>Leaderboard</h1>
            {scores.length > 0 ? (
                <table className={styles.leaderboardTable}>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Player Name</th>
                            <th onClick={() => requestSort('score')} className={styles.sortable}>Score ▾</th>
                            <th onClick={() => requestSort('time')} className={styles.sortable}>Time (s) ▾</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedScores.map((entry, index) => (
                            <tr key={entry.date}>
                                <td>{index + 1}</td>
                                <td>{entry.name}</td>
                                <td>{entry.score}</td>
                                <td>{entry.time}</td>
                                <td>{new Date(entry.date).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No scores recorded yet. Be the first to play!</p>
            )}
        </div>
    );
};

export default Leaderboard;