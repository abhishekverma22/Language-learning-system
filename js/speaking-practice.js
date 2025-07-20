import { rtdb, auth, db } from "../firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { ref as dbRef, get } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

let sentenceByAI = document.getElementById("sentenceByAI");
let sentenceByUser = document.getElementById("sentenceByUser");
let micBtn = document.getElementById("mic-icon");
let feedbackPara = document.getElementById("show-feedback");
let languageSelect = document.getElementById("languageSelect");

let wordList = [];
let currentWordIndex = 0;
let correctWords = [];
let wrongWords = [];
let userUID = null;
let lang = null;

// Step 1: Check user is logged in
onAuthStateChanged(auth, (user) => {
  if (user) {
    userUID = user.uid;
    console.log("User logged in:", userUID);
  } else {
    alert("Please log in first to use this feature.");
    window.location.href = "../html/login-page.html";
  }
});

// Step 2: Language selection
languageSelect.addEventListener("change", async () => {
  lang = languageSelect.value;
  if (!lang) return;

  const langRef = dbRef(rtdb, `speaking/${lang}/words`);
  try {
    const snapshot = await get(langRef);
    if (snapshot.exists()) {
      wordList = snapshot.val();
      currentWordIndex = 0;
      correctWords = [];
      wrongWords = [];
      sentenceByAI.innerText = wordList[currentWordIndex];
    } else {
      alert("No words found for this language.");
    }
  } catch (error) {
    console.error("Error fetching language data:", error);
  }
});

// Step 4: Setup Speech Recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  alert("Your browser does not support speech recognition.");
} else {
  const recognition = new SpeechRecognition();
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  let isListening = false;

  micBtn.addEventListener("click", () => {
    if (isListening || !wordList.length || !lang) return;

    recognition.lang = lang;
    feedbackPara.textContent = "";
    feedbackPara.className = "feedback-box";
    sentenceByUser.textContent = "....";

    recognition.start();
    isListening = true;
  });

  recognition.onresult = async (event) => {
    const spokenText = event.results[0][0].transcript.trim();
    sentenceByUser.textContent = spokenText;

    const normalize = str => str.toLowerCase().replace(/[^a-z]/g, "");
    const expected = wordList[currentWordIndex];

    const normalizedSpoken = normalize(spokenText);
    const normalizedExpected = normalize(expected);

    if (normalizedSpoken === normalizedExpected) {
      feedbackPara.textContent = "✅ Great Job!";
      feedbackPara.style.color = "green";
      correctWords.push(expected);
    } else {
      feedbackPara.textContent = "❌ Try Again";
      feedbackPara.style.color = "red";
      wrongWords.push(expected);
    }

    // Next word or finish
    currentWordIndex++;
    if (currentWordIndex < wordList.length) {
      setTimeout(() => {
        sentenceByAI.innerText = wordList[currentWordIndex];
        sentenceByUser.textContent = "";
        feedbackPara.textContent = "";
      }, 1000);
    } else {
      sentenceByAI.innerText = "✅ Practice Complete!";
      micBtn.disabled = true;

      const now = new Date();
      const dateKey = now.toISOString().split("T")[0];

      const userDocRef = doc(db, `users/${userUID}/speakingProgress/${dateKey}`);
      const userDocSnap = await getDoc(userDocRef);
      const existingData = userDocSnap.exists() ? userDocSnap.data() : {};

      if (existingData[dateKey] && existingData[dateKey][lang]) {
        alert("✅ You've already completed speaking practice for this language today.");
        return;
      }

      await setDoc(userDocRef, {
        [dateKey]: {
          ...(existingData[dateKey] || {}),
          [lang]: {
            time: now.toLocaleTimeString(),
            correct: correctWords,
            wrong: wrongWords
          }
        }
      }, { merge: true });

      alert("🎉 Speaking progress saved successfully!");
    }
  };

  recognition.onerror = (event) => {
    feedbackPara.textContent = "❌ Error: " + event.error;
    feedbackPara.style.color = "red";
    isListening = false;
  };

  recognition.onend = () => {
    isListening = false;
  };
}
