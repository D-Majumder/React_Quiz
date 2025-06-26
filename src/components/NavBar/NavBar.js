import React, { useState, useEffect, useRef, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { QuizContext } from '../../context/QuizContext';
import styles from './NavBar.module.css';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useContext(QuizContext);
  const menuRef = useRef();

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };
  
  const handleThemeToggle = () => {
      setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMenuOpen && menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <header className={styles.navbar}>
      <div className={styles.navContainer}>
        <NavLink to="/" className={styles.logo}>
          QuizApp
        </NavLink>

        <button
          className={styles.hamburger}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>

        <nav
          ref={menuRef}
          className={`${styles.navLinks} ${isMenuOpen ? styles.showMenu : ''}`}
          aria-label="Main navigation"
        >
          <NavLink
            to="/"
            className={({ isActive }) => isActive ? styles.active : ''}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/start-quiz"
            className={({ isActive }) => isActive ? styles.active : ''}
            onClick={() => setIsMenuOpen(false)}
          >
            Start Quiz
          </NavLink>
          <NavLink
            to="/scores"
            className={({ isActive }) => isActive ? styles.active : ''}
            onClick={() => setIsMenuOpen(false)}
          >
            Scores
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => isActive ? styles.active : ''}
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </NavLink>
          <button 
            className={styles.themeToggle} 
            onClick={handleThemeToggle}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;