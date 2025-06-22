import React from 'react';
import styles from './AboutPage.module.css';

const AboutPage = () => {
    return (
        <div className={styles.aboutContainer}>
            <h1>About This Quiz App</h1>
            <p>
                This interactive quiz application was built as an assignment to demonstrate key concepts in modern web development.
            </p>
            
            <div className={styles.section}>
                <h2>Tech Stack</h2>
                <ul>
                    <li><strong>ReactJS:</strong> For building the user interface with components.</li>
                    <li><strong>React Router:</strong> For handling client-side routing.</li>
                    <li><strong>React Hooks (useState, useEffect, useContext):</strong> For state management and side effects.</li>
                    <li><strong>CSS Modules:</strong> For scoped and maintainable styling.</li>
                    <li><strong>localStorage API:</strong> For data persistence across sessions.</li>
                </ul>
            </div>
            
            <div className={styles.section}>
                <h2>What I Learned</h2>
                <p>
                    Building this project was a great exercise in solidifying several core React principles:
                </p>
                <ul>
                    <li><strong>Component-Based Architecture:</strong> Breaking down the UI into manageable and reusable components like NavBar, QuizEngine, etc.</li>
                    <li><strong>State Management:</strong> Using <code>useState</code> for local component state and <code>useContext</code> for global state (like player info) to avoid prop drilling.</li>
                    <li><strong>Handling Side Effects:</strong> Leveraging <code>useEffect</code> for asynchronous operations like timers and fetching/saving data to <code>localStorage</code>.</li>
                    <li><strong>Responsive Design:</strong> Implementing a mobile-first approach with CSS media queries to ensure the app looks great on all devices.</li>
                </ul>
            </div>

            <div className={styles.section}>
                <h2>Just for Fun</h2>
                <p>
                    When the timer runs out and the app auto-skips the question:
                </p>
                <img 
                    src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExenhsZ2Q0N2s4OGV0OWlucGtsODdvZGRmaHdvYXRtbzZ0bnZwdTV2diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/vfyN4sCz1QBR6/giphy.gif" 
                    alt="Confused Travolta Meme" 
                    className={styles.meme}
                />
            </div>
        </div>
    );
};

export default AboutPage;