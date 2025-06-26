import React from 'react';
import styles from './Footer.module.css';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className={styles.mainFooter}>
      <div className={styles.footerContent}>
        <div className={styles.madeWithLove}>
          Made with <span className={styles.heartbeatIcon}>❤️</span> by Dhruba
        </div>
        <div className={styles.socialMedia}>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FaTwitter />
          </a>
        </div>
        <div className={styles.footerLinks}>
          <a href="https://example.com/terms" target="_blank" rel="noopener noreferrer">Terms</a>
          <span>&bull;</span>
          <a href="https://example.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
        </div>
      </div>
      <button 
        className={styles.backToTop} 
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        ⇧
      </button>
    </footer>
  );
};

export default Footer;