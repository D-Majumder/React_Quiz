import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizContext } from '../../context/QuizContext';
import { quizData } from '../../data/questions';
import styles from './QuizEngine.module.css';

const QuizEngine = () => {
  const navigate = useNavigate();
  const { player, setScore, setTotalTime } = useContext(QuizContext);

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timer, setTimer] = useState(15);
  const [localScore, setLocalScore] = useState(0);
  const [answerTimes, setAnswerTimes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!player.name || !player.category || !player.difficulty) {
      navigate('/start-quiz');
      return;
    }
    const loaded = quizData[player.category]?.[player.difficulty] || [];
    setQuestions(loaded);
    setIsLoading(false);
  }, [player, navigate]);

  useEffect(() => {
    if (questions.length === 0 || isAnswered) return;

    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev === 1) {
          // Auto-skip with time logged as full 15 seconds
          setAnswerTimes(prev => [...prev, { question: currentQuestionIndex, time: 15 }]);
          handleNextQuestion();
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentQuestionIndex, isAnswered, questions.length]);

  const handleAnswerSelect = (option) => {
    if (isAnswered) return;

    const timeTaken = 15 - timer;
    setAnswerTimes(prev => [...prev, { question: currentQuestionIndex, time: timeTaken }]);
    setSelectedAnswer(option);
    setIsAnswered(true);

    if (option === questions[currentQuestionIndex].answer) {
      setLocalScore(prev => prev + 1);
    }

    setTimeout(() => {
      handleNextQuestion();
    }, 2000);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      resetQuestionState();
    } else {
      const totalTimeTaken = answerTimes.reduce((acc, curr) => acc + curr.time, 0);
      setScore(localScore);
      setTotalTime(totalTimeTaken);
      navigate('/score');
    }
  };

  const resetQuestionState = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setTimer(15);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      resetQuestionState();
    }
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading questions...</div>;
  }

  if (questions.length === 0) {
    return <div className={styles.loading}>No questions found for this category and difficulty.</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className={styles.quizContainer}>
      <div className={styles.quizHeader}>
        <div className={styles.progressInfo}>
          Question {currentQuestionIndex + 1} / {questions.length}
        </div>
        <div className={styles.timer}>Time Left: {timer}s</div>
      </div>

      <div className={styles.progressBarContainer}>
        <div className={styles.progressBar} style={{ width: `${progressPercentage}%` }}></div>
      </div>

      <div className={styles.question}>
        <h3>{currentQuestion.question}</h3>
      </div>

      <div className={styles.options}>
        {currentQuestion.options.map((option, index) => {
          const isCorrect = option === currentQuestion.answer;
          const isSelected = selectedAnswer === option;
          let optionClass = styles.option;

          if (isAnswered) {
            if (isCorrect) optionClass += ` ${styles.correct}`;
            else if (isSelected) optionClass += ` ${styles.incorrect}`;
          }

          return (
            <button
              key={index}
              className={optionClass}
              onClick={() => handleAnswerSelect(option)}
              disabled={isAnswered}
            >
              {option}
            </button>
          );
        })}
      </div>

      <div className={styles.navigationButtons}>
        <button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
          Previous
        </button>
      </div>
    </div>
  );
};

export default QuizEngine;