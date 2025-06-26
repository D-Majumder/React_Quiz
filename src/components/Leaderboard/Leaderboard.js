import React, { useState, useMemo, useContext } from 'react';
import { QuizContext } from '../../context/QuizContext';
import styles from './Leaderboard.module.css';

const Leaderboard = () => {
  const { scoresHistory } = useContext(QuizContext);
  const [sortConfig, setSortConfig] = useState({
    key: 'score',
    direction: 'descending'
  });

  const sortedScores = useMemo(() => {
    const items = [...scoresHistory];
    if (sortConfig) {
      items.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sort_config.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return items;
  }, [scoresHistory, sortConfig]);

  const requestSort = (key) => {
    let direction = 'descending';
    if (sortConfig.key === key && sortConfig.direction === 'descending') {
      direction = 'ascending';
    } else if (key === 'time' && sortConfig.key !== 'time') {
      direction = 'ascending';
    }
    setSortConfig({ key, direction });
  };

  const getArrow = (key) => {
    if (sortConfig.key !== key) return '↕';
    return sortConfig.direction === 'ascending' ? '↑' : '↓';
  };

  return (
    <div className={styles.leaderboardContainer}>
      <h1>Leaderboard</h1>

      {scoresHistory.length > 0 ? (
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