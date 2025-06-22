import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';
// You'll need to find and place these SVGs in your /assets folder
// import { ReactComponent as HamburgerIcon } from '../../assets/hamburger-icon.svg';
// import { ReactComponent as CloseIcon } from '../../assets/close-icon.svg';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.navContainer}>
        <NavLink to="/" className={styles.logo}>QuizApp</NavLink>
        <nav className={`${styles.navLinks} ${isMenuOpen ? styles.showMenu : ''}`}>
          <NavLink to="/" className={({ isActive }) => isActive ? styles.active : ''} onClick={toggleMenu}>Home</NavLink>
          <NavLink to="/start-quiz" className={({ isActive }) => isActive ? styles.active : ''} onClick={toggleMenu}>Start Quiz</NavLink>
          <NavLink to="/scores" className={({ isActive }) => isActive ? styles.active : ''} onClick={toggleMenu}>Scores</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? styles.active : ''} onClick={toggleMenu}>About</NavLink>
        </nav>
        <div className={styles.hamburger} onClick={toggleMenu}>
            {/* {isMenuOpen ? <CloseIcon /> : <HamburgerIcon />} */}
            {/* Using text as a placeholder for icons */}
            {isMenuOpen ? 'Close' : 'Menu'}
        </div>
      </div>
    </header>
  );
};

export default NavBar;