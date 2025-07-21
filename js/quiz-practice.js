import { rtdb, auth, db } from "../firebase-config.js";

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { ref, get } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";
import { doc, setDoc, getDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";


// DOM elements
const questionCountText = document.getElementById("question-count");
const select = document.getElementById("difficulty");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("quiz-options");
const submitBtn = document.getElementById("submit-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const answerSection = document.getElementById("answer-section");
const correctAnswerText = document.getElementById("correct-answer-text");
const closeBtn = document.getElementById("close-btn");

let allQuestions = [];
let currentIndex = 0;
let selectedAnswer = {};
let correctAnswerCount = 0;
let userUID = null;


// Check login
onAuthStateChanged(auth, async (user) => {
  if (user) {
    userUID = user.uid;

    // Get language from URL
    const params = new URLSearchParams(window.location.search);
    const language = params.get("lang ")?.trim();

    if (!language) {
      window.location.href = "../html/login-page.html";
      return;
    }

    select.addEventListener("change", async (e) => {
      const level = e.target.value;
      await fetchQuiz(language, level);
      renderQuestion();
      document.getElementById("quiz-section-unhide").style.display = "block"
      document.getElementById("lang-select").style.display = "none"
    });

    submitBtn.addEventListener("click", submitQuiz);

    nextBtn.addEventListener("click", () => {
      if (currentIndex < allQuestions.length - 1) {
        currentIndex++;
        renderQuestion();
      }
    });

    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        renderQuestion();
      }
    });

    closeBtn.addEventListener("click", () => {
      window.location.reload()
    })
  } else {
    window.location.replace('../html/login-page.html');
  }
});

// Fetch quiz questions from Realtime Database
async function fetchQuiz(language, level) {
  const quizRef = ref(rtdb, `quizzes/${language}`);
  const snapshot = await get(quizRef);

  if (snapshot.exists()) {
    const allQuestionsRaw = Object.values(snapshot.val()); // ✅ fixed
    const filteredQuestions = allQuestionsRaw.filter(q => q.difficulty === level);

    if (filteredQuestions.length < 5) {
      alert(`Only ${filteredQuestions.length} questions found for level "${level}"`);
      return;
    }

    allQuestions = filteredQuestions.sort(() => Math.random() - 0.5).slice(0, 5); // ✅ shuffled
    currentIndex = 0;
    selectedAnswer = {};
    correctAnswerCount = 0;
    answerSection.style.display = "none";
    renderQuestion();
  } else {
    alert("No quiz found for selected language.");
  }
}

// Render one question at a time
function renderQuestion() {
  const q = allQuestions[currentIndex];
  questionText.innerText = q.question;
  questionCountText.innerText = `Question ${currentIndex + 1} of ${allQuestions.length}`;
  optionsContainer.innerHTML = "";

  q.options.forEach((opt) => {
    const [label, text] = opt.split(") ");
    const isChecked = selectedAnswer[currentIndex] === opt ? "checked" : "";
    const optionHtml = `
      <div class="option">
        <label>
          <input type="radio" name="answer" value="${opt}" ${isChecked}>
          ${text}
        </label>
      </div>
    `;
    optionsContainer.insertAdjacentHTML("beforeend", optionHtml);
  });

  document.querySelectorAll("input[name='answer']").forEach((input) => {
    input.addEventListener("change", (e) => {
      selectedAnswer[currentIndex] = e.target.value;
    });
  });
}





async function submitQuiz() {
  const qlevel = select.value;
  if (!qlevel) return alert("Please select difficulty level first.");
  if (Object.keys(selectedAnswer).length < allQuestions.length) {
    return alert("Please answer all questions before submitting.");
  }

  correctAnswerCount = 0;
  let resultHtml = ""

  allQuestions.forEach((q, i) => {
    const userAns = selectedAnswer[i];
    const isCorrect = userAns === q.correctAnswer;
    if (isCorrect) correctAnswerCount++;

    resultHtml += `
      <div style="margin-bottom: 12px; padding: 10px; border-left: 4px solid ${isCorrect ? 'green' : 'red'};">
        <strong>Q${i + 1}:</strong> ${q.question}<br>
        <strong>Your answer:</strong> ${userAns || "Not answered"}<br>
        <strong>✅ Correct answer:</strong> ${q.correctAnswer}<br>
        <strong>💡 Explanation:</strong> ${q.explanation || "No explanation provided."}
      </div>
    `;
  });

  // Save to Firestore
  const today = new Date().toISOString().split("T")[0];
  const params = new URLSearchParams(window.location.search);
  const language = params.get("lang ")?.trim(); // 🔁 fixed lang key

  const progressRef = doc(db, `users/${userUID}/quizProgress/${today}`);
  const prevData = (await getDoc(progressRef)).data() || {};

  await setDoc(progressRef, {
    ...prevData,
    [qlevel]: {
      attempted: allQuestions.length,
      correct: correctAnswerCount,
      language,
      timestamp: serverTimestamp()
    }
  });

  // Final score + all answers
  correctAnswerText.innerHTML = `<strong>You got ${correctAnswerCount} out of ${allQuestions.length} correct.</strong><br><br>` + resultHtml;
  answerSection.style.display = "block";
}


