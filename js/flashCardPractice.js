import { rtdb, auth, db } from "../firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { ref as dbRef, get as dbGet } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";
import { doc, setDoc, getDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";



const flashCardContainer = document.querySelector(".flashCard-practice-section");
let selectLevel = document.getElementById("difficulty");
let doneBtn = document.getElementById("done-btn");

let userUID = null;
let language = null;
let selectedCards = [];



//  1. check user are present or not

onAuthStateChanged(auth, (user) => {
  if (user) {

    userUID = user.uid;

    language = getLanguage()
    if (!language) window.location.replace("../html/login-page.html");

    //  if user are not login redirect to login page 
    setupLevelChangeListener(language)
    doneBtn.addEventListener('click', handleDoneClick);

  } else {
    window.location.replace("../html/login-page.html");
  }
});

// get language from URL
function getLanguage() {
  const params = new URLSearchParams(window.location.search)
  return language = params.get("lang ")?.trim();
}

//  get diffculity level get value from select tag
function setupLevelChangeListener(language) {

  selectLevel.addEventListener("change", async (e) => {
    const level = e.target.value;
    if (!level) return;

    const allCards = await fetchAllFlashCards(language, level);
    selectedCards = pickRandom5(allCards);
    renderFlashCard(selectedCards);

    document.getElementById("lang-select").style.display = "none";
    document.getElementById("complete-button").style.display = "block";
    flashCardContainer.removeAttribute("id");
  });


}


//  fetch flashCards from firebase real time database 
async function fetchAllFlashCards(language, level) {
  const flashRef = dbRef(rtdb, `flashcards/${language}/${level}`);

  const snapshot = await dbGet(flashRef);

  if (!snapshot.exists()) {
    flashCardContainer.innerHTML = "No Cards Found.";
    return [];
  }

  const allCardObj = snapshot.val();

  return Object.entries(allCardObj).map(([id, card]) => ({ id, ...card }));

}


// Randomly pick 5 cards
function pickRandom5(cards) {
  const shuffled = [...cards].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, 5);
}


//  Render cards
function renderFlashCard(cards = []) {
  flashCardContainer.innerHTML = ""

  if (cards.length == 0) return;

  cards.forEach(card => {
    const div = document.createElement("div");
    div.className = "flip-card"

    div.innerHTML = `
                  <div class="flip-card-inner">
                <div class="flip-card-front">
                  <h2>Prompt</h2>
                  <p>${card.front}</p>
                </div>
                <div class="flip-card-back">
                  <h2>Answer/Information</h2>
                  <p>${card.back}</p>
                </div>
              </div>  
      `;

    flashCardContainer.appendChild(div)
  })

};


// Done button handler

async function handleDoneClick() {
  if (!selectedCards.length || !language || !selectLevel.value) return;

  const level = selectLevel.value;
  const today = new Date().toISOString().split("T")[0];
  const progressRef = doc(db, `users/${userUID}/flashcardProgress/${today}`);
  const docSnap = await getDoc(progressRef);

  const prevData = docSnap.exists() ? docSnap.data() : {};

  // ✅ Prevent duplicate save
  if (prevData[level]) {
    alert("You've already completed flashcards for this level today ✅");
    return;
  }

  // ✅ Save only if not saved earlier
  await setDoc(progressRef, {
    ...prevData,
    [level]: {
      language: language,
      seeCount: selectedCards.length,
      timestamp: serverTimestamp(),
      cards: selectedCards
    }
  });

  alert("Well done! Your progress is saved for today 🎉");
  window.location.reload();
}
