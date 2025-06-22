import React, { useState, useEffect, useMemo } from 'react';
import styles from './Leaderboard.module.css';

const Leaderboard = () => {
  const [scores, setScores] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: 'score',
    direction: 'descending'
  });

  // Load leaderboard from localStorage
  useEffect(() => {
    const loaded = JSON.parse(localStorage.getItem('quizLeaderboard')) || [];
    setScores(loaded);
  }, []);

  // Sort data based on sortConfig
  const sortedScores = useMemo(() => {
    const items = [...scores];
    if (sortConfig) {
      items.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return items;
  }, [scores, sortConfig]);

  // Handle header click
  const requestSort = (key) => {
    let direction = 'ascending';
    if (
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    // Set sensible defaults
    if (key === 'score') direction = 'descending';
    if (key === 'time') direction = 'ascending';

    setSortConfig({ key, direction });
  };

  const getArrow = (key) => {
    if (sortConfig.key !== key) return '↕';
    return sortConfig.direction === 'ascending' ? '↑' : '↓';
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
              <th>
                <button
                  type="button"
                  className={styles.sortable}
                  onClick={() => requestSort('score')}
                >
                  Score {getArrow('score')}
                </button>
              </th>
              <th>
                <button
                  type="button"
                  className={styles.sortable}
                  onClick={() => requestSort('time')}
                >
                  Time (s) {getArrow('time')}
                </button>
              </th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {sortedScores.map((entry, idx) => (
              <tr key={`${entry.date}-${idx}`}>
                <td>{idx + 1}</td>
                <td>{entry.name}</td>
                <td>{entry.score}</td>
                <td>{entry.time}</td>
                <td>
                  {new Date(entry.date).toLocaleDateString()}
                </td>
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