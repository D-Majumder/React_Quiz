import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import HeroSection from './components/HeroSection/HeroSection';
import AddPlayerForm from './components/AddPlayerForm/AddPlayerForm';
import QuizEngine from './components/QuizEngine/QuizEngine';
import ScoreSummary from './components/ScoreSummary/ScoreSummary';
import Leaderboard from './components/Leaderboard/Leaderboard';
import AboutPage from './components/AboutPage/AboutPage';
import NotFound from './components/NotFound/NotFound';                    
import './App.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/start-quiz" element={<AddPlayerForm />} />
          <Route path="/quiz/start" element={<QuizEngine />} />
          <Route path="/score" element={<ScoreSummary />} />
          <Route path="/scores" element={<Leaderboard />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;