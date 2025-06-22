# Interactive React Quiz Website

This is a single-page application (SPA) built with React that provides an interactive quiz experience. It features score tracking, a question timer, persistent data using `localStorage`, and a responsive design. This project was built to demonstrate proficiency in core React concepts, routing, and modern web development practices.

## Features

- **Responsive Navigation**: A fixed navbar with a hamburger menu for mobile screens.
- **Engaging Homepage**: A visually appealing hero section with a CSS animation and a clear call-to-action.
- **Customizable Quizzes**: Users can enter their name and choose a quiz category and difficulty level.
- **Interactive Quiz Engine**:
  - One question at a time.
  - 15-second timer per question.
  - Auto-skips to the next question on timeout.
  - Highlights correct and incorrect answers.
  - Tracks time taken to answer each question.
- **Score Summary**: A summary page displaying the final score, total time, and a motivational message.
- **Persistent Leaderboard**: All scores are saved to `localStorage` and displayed on a sortable leaderboard (by score or time).
- **Client-Side Routing**: Uses `react-router-dom` to manage different views and includes a custom 404 page.

## Tech Stack

- **Frontend:** ReactJS, JavaScript (ES6+), CSS3 (with CSS Modules)
- **Routing:** `react-router-dom`
- **State Management:** React Hooks (`useState`, `useEffect`, `useContext`)
- **Data Persistence:** Browser `localStorage` API

## Project Setup and Installation

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/get-npm) installed on your machine.

### Installation

1. **Clone the repository:**
   ```sh
   git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)