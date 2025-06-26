import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizContext } from '../../context/QuizContext';
import { quizData } from '../../data/questions';
import styles from './AddPlayerForm.module.css';

const AddPlayerForm = () => {
  const navigate = useNavigate();
  const { player, setPlayer } = useContext(QuizContext);

  const [formData, setFormData] = useState({
    name: player.name || '',
    category: player.category || '',
    difficulty: player.difficulty || '',
  });
  
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const quizCategories = Object.keys(quizData);

  useEffect(() => {
    const { name, category, difficulty } = formData;
    setIsButtonDisabled(!name || !category || !difficulty);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isButtonDisabled) {
      setPlayer(formData);
      navigate('/quiz/start');
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.quizForm}>
        <h2>Ready to Play?</h2>
        <div className={styles.formGroup}>
          <label htmlFor="name">Player Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="category">Quiz Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a Category</option>
            {quizCategories.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="difficulty">Difficulty</label>
          <select
            id="difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            required
          >
            <option value="">Select Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <button type="submit" className={styles.startButton} disabled={isButtonDisabled}>
          Start Quiz
        </button>
      </form>
    </div>
  );
};

export default AddPlayerForm;