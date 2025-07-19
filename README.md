# Language-learning-sysmtem (FluencyMate)

## Introduction
*FluencyMate is an innovative language learning web application designed to help users master new languages through a fully interactive, engaging, and personalized learning experience. The primary purpose of the app is to simplify language acquisition by combining AI-powered tools, gamified learning elements, and real-world conversation practice into a single, accessible platform.*

*The core functionality of FluencyMate includes interactive lessons, real-time quizzes with instant feedback, speech recognition for pronunciation practice, flashcards with spaced repetition, and detailed progress tracking. Users can choose from multiple languages such as English, Spanish, French, German, Japanese, and more, with support for various difficulty levels.*

*This app addresses common problems faced by language learners—such as lack of consistent practice, low engagement, and limited access to native speakers—by offering a rich, adaptive, and user-friendly environment. Whether you're a beginner or an advanced learner, FluencyMate guides your journey step by step, making language learning effective, fun, and achievable.*

## ## Project Type
FluencyMate is a fullstack web application that combines both frontend and backend technologies to deliver a seamless and dynamic language learning experience.

- Frontend: Built using HTML, CSS, and JavaScript, it provides a responsive and interactive user interface with features like quizzes, flashcards, progress dashboards, and speaking practice tools.

- Backend: Powered by Firebase (Realtime Database, Authentication, and Storage), it handles user management, real-time data syncing, quiz tracking, flashcard storage, and speech data analysis.

## Deplolyed App

- Frontend: https://fluencymate.netlify.app/
- Backend: https://console.firebase.google.com/
- Database: https://learning-language-system-default-rtdb.asia-southeast1.firebasedatabase.app/

## Directory Structure

LANGUAGE LEARNING PLATFORM/       # Root directory of the project
├── css/                          # Folder containing all CSS files (for styling each page)
│   ├── about-page.css            # Styles for About page
│   ├── courses.css               # Styles for Courses listing
│   ├── dashboard-page.css        # Styles for User Dashboard
│   ├── feedback-form.css         # Styles for Feedback form
│   ├── flashCards.css            # Styles for Flashcard UI
│   ├── login-page.css            # Styles for Login page
│   ├── practice.css              # Styles for Speaking Practice page
│   ├── quizzes-page.css          # Styles for Quiz page
│   ├── signup-page.css           # Styles for Signup page
│   └── speaking-practice.css     # Styles for Speech Recognition interface

├── html/                         # Folder containing all HTML pages
│   ├── about-page.html           # About the project or platform
│   ├── courses.html              # Courses selection and listing
│   ├── dashboard-page.html       # Main dashboard after login
│   ├── feedback.html             # Feedback submission page
│   ├── flashCards.html           # Flashcards UI for spaced repetition
│   ├── login-page.html           # Login form
│   ├── practice.html             # Speaking practice page with mic input
│   ├── quizzes-page.html         # Quiz interface page
│   ├── signup-page.html          # Signup form
│   └── speaking-practice.html    # Page for pronunciation feedback using Web Speech API

├── images/                       # Folder for images, icons, logos
│   └── (icons, logos, UI illustrations)  # Add all visual assets here

├── js/                           # Folder containing JavaScript functionality
│   ├── courses.js                # Logic for Courses page
│   ├── dashboard.js              # Logic for dynamic Dashboard
│   ├── feedback.js               # Handles Feedback form behavior
│   ├── flashCard.js              # Flashcard functionality (with spaced repetition)
│   ├── login.js                  # Handles user login actions
│   ├── logout-hamburger.js       # Hamburger menu + Logout logic
│   ├── practice.js               # Mic input and speech analysis logic
│   ├── quizzes-practice.js       # Quiz logic (load questions, check answers)
│   ├── signup.js                 # Handles user registration
│   ├── speaking-practice.js      # Captures speech and provides pronunciation feedback
│   ├── firebase-config.js        # Firebase setup (Auth, DB, etc.)
│   ├── index.html                # Mistakenly placed file, should be moved to root or html/
│   ├── learningData.json         # JSON file containing flashcards or quiz content
│   ├── script.js                 # Generic script (e.g., for navbar or reusable UI)
│   └── style.css                 # Global stylesheet (applied site-wide)

├── README.md                     # Markdown documentation for your project
├── index.html                    # Root-level home or redirect page (optional)
└── .vscode/                      # VS Code-specific settings folder (optional, for dev config)


