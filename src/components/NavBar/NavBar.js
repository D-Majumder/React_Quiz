import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef();

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  // Close menu on click outside
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
        </nav>
      </div>
    </header>
  );
};

export default NavBar;