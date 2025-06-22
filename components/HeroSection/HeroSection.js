import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HeroSection.module.css';
// import { ReactComponent as HeroImage } from '../../assets/hero-image.svg';

const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.heroContainer}>
            <div className={styles.textContainer}>
                <h1 className={styles.title}>Welcome to the Ultimate Quiz Challenge!</h1>
                <p className={styles.subtitle}>Test your knowledge, challenge your friends, and climb the leaderboard.</p>
                <button onClick={() => navigate('/start-quiz')} className={styles.ctaButton}>
                    Start Quiz Now!
                </button>
            </div>
            <div className={styles.imageContainer}>
                {/* <HeroImage className={styles.heroImage} /> */}
                {/* Using a placeholder div for the image */}
                <div className={styles.heroImagePlaceholder}>Your Cool SVG Here</div>
            </div>
        </div>
    );
};

export default HeroSection;