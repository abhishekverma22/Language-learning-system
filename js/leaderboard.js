import { db, auth } from "../firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import {
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const quizList = document.getElementById("quiz-score-list");
const flashList = document.getElementById("flashcard-score-list");
const quizDateFilter = document.getElementById("quizDateFilter");
const flashDateFilter = document.getElementById("flashDateFilter");
const quizSortDate = document.getElementById("quizSortDate");
const flashSortDate = document.getElementById("flashSortDate");

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;

    const quizProgressRef = collection(db, "users", uid, "quizProgress");
    const flashcardProgressRef = collection(db, "users", uid, "flashcardProgress");

    const quizSnapshot = await getDocs(quizProgressRef);
    const flashSnapshot = await getDocs(flashcardProgressRef);

    const quizData = [];
    quizSnapshot.forEach((docSnap) => quizData.push({ id: docSnap.id, ...docSnap.data() }));

    const flashData = [];
    flashSnapshot.forEach((docSnap) => flashData.push({ id: docSnap.id, ...docSnap.data() }));

    const applyFilterAndSort = (data, filterDate, sortOrder) => {
      let filtered = data;
      if (filterDate) {
        filtered = data.filter((item) => item.id === filterDate);
      }
      if (sortOrder === "asc") {
        filtered.sort((a, b) => a.id.localeCompare(b.id));
      } else {
        filtered.sort((a, b) => b.id.localeCompare(a.id));
      }
      return filtered;
    };

    const renderList = (data, listElement, type) => {
      listElement.innerHTML = "";

      data.forEach((entry) => {
        const dateItem = document.createElement("li");
        dateItem.classList.add(type === "quiz" ? "quiz-date-item" : "flash-date-item");

        const toggleDiv = document.createElement("div");
        toggleDiv.classList.add(type === "quiz" ? "quiz-date-toggle" : "flash-date-toggle");
        toggleDiv.textContent = `📅 ${entry.id}`;
        toggleDiv.style.cursor = "pointer";

        const levelList = document.createElement("ul");
        levelList.classList.add("level-list");
        levelList.style.display = "none";

        const levels = type === "quiz"
          ? ["easy", "medium", "hard"]
          : ["Beginner", "Intermediate", "Advanced"];

        levels.forEach((level) => {
          const levelData = entry[level];
          if (!levelData) return;

          const levelItem = document.createElement("li");
          levelItem.classList.add("level-toggle");
          levelItem.textContent = level;

          const detailDiv = document.createElement("div");
          detailDiv.classList.add("level-details");
          detailDiv.style.display = "none";

          if (type === "quiz") {
            detailDiv.textContent = `Language: ${levelData.language} | Attempted: ${levelData.attempted} | Correct: ${levelData.correct} | Time: ${levelData.time}`;
          } else {
            const lang = entry.Advanced?.language || "Unknown";
            const seeCount = levelData.seeCount || entry.Advanced?.seeCount || 0;
            const time = entry.Advanced?.timestamp || "N/A";
            const cardCount = levelData.cards?.length || 0;
            detailDiv.textContent = `Cards Seen: ${seeCount} | Cards in this level: ${cardCount} | Language: ${lang} | Time: ${time}`;
          }

          levelItem.appendChild(detailDiv);
          levelList.appendChild(levelItem);

          // Toggle individual level
          levelItem.addEventListener("click", () => {
            detailDiv.style.display = detailDiv.style.display === "none" ? "block" : "none";
          });
        });

        // Toggle entire date
        toggleDiv.addEventListener("click", () => {
          levelList.style.display = levelList.style.display === "none" ? "block" : "none";
        });

        dateItem.appendChild(toggleDiv);
        dateItem.appendChild(levelList);
        listElement.appendChild(dateItem);
      });
    };

    // Initial render
    renderList(applyFilterAndSort(quizData, quizDateFilter.value, quizSortDate.value), quizList, "quiz");
    renderList(applyFilterAndSort(flashData, flashDateFilter.value, flashSortDate.value), flashList, "flash");

    // Listeners
    quizDateFilter.addEventListener("change", () => {
      renderList(applyFilterAndSort(quizData, quizDateFilter.value, quizSortDate.value), quizList, "quiz");
    });
    quizSortDate.addEventListener("change", () => {
      renderList(applyFilterAndSort(quizData, quizDateFilter.value, quizSortDate.value), quizList, "quiz");
    });
    flashDateFilter.addEventListener("change", () => {
      renderList(applyFilterAndSort(flashData, flashDateFilter.value, flashSortDate.value), flashList, "flash");
    });
    flashSortDate.addEventListener("change", () => {
      renderList(applyFilterAndSort(flashData, flashDateFilter.value, flashSortDate.value), flashList, "flash");
    });
  }
});
