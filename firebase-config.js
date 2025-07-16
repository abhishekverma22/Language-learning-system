
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyCEL7U6tDzvsQdG3T56BlLk6fuB5Z_dqF0",
  authDomain: "learning-language-system.firebaseapp.com",
  projectId: "learning-language-system",
  storageBucket: "learning-language-system.firebasestorage.app",
  messagingSenderId: "310719837811",
  appId: "1:310719837811:web:8a910e9037f7869590dc06",
  measurementId: "G-XDWXWBYNVV"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
