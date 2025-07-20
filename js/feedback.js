import { auth, db } from '../firebase-config.js';
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

// track current user

let currentUser = null;
onAuthStateChanged(auth, async (user) => {
  if (user) {
    currentUser = user.uid;
    // Reference to firestore user document.

    const userDocRef = doc(db, "users", currentUser);
    const userSnapShort = await getDoc(userDocRef)

    if (userSnapShort.exists()) {
      const userData = userSnapShort.data();
      document.getElementById("feedback-name").value = `${userData.firstName} ${userData.lastName}`
      document.getElementById("feedback-email").value = `${userData.email}`

      //  handle rating
      let ratingCount = 0;

      document.querySelectorAll(".star-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          ratingCount = parseInt(btn.value);

          // 🔄 Remove active class from all buttons first
          document.querySelectorAll(".star-btn").forEach(b => b.classList.remove("active"));

          // ✅ Add active to the clicked one only
          btn.classList.add("active");
        });
      });

      document.getElementById("submit-feedback").addEventListener("click", async (e) => {
        e.preventDefault();


        const name = document.getElementById("feedback-name").value.trim();
        const email = document.getElementById("feedback-email").value.trim();
        const category = document.getElementById("feedback-category").value;
        const comment = document.getElementById("feedback-comments").value.trim();

        if (!name || !email || !category || !comment) {
          alert("Please fill in all fields and select a rating.");
          return;
        }



        try {

          await addDoc(collection(db, "feedback"), {
            userID: currentUser,
            name,
            email,
            category,
            rating: ratingCount,
            comment,
            time: serverTimestamp()
          });
          alert("✅ Feedback submitted successfully!");

          document.getElementById("feedback-category").value = "";
          document.getElementById("feedback-comments").value = "";
          ratingCount = 0;
          document.querySelectorAll(".star-btn").forEach(b => b.classList.remove("active"));

        } catch (error) {
          console.error("❌ Error submitting feedback:", error.message);
          alert("Error submitting feedback. Try again.");

        }


      }
      )
    }


  } else {
    window.location.href = "../html/login-page.html"
  }












  // 🍔 Hamburger menu toggle
  const dashboardContainer = document.getElementById("dashboard-container");
  const hamburger = document.getElementById("hamburger");
  const aside = document.querySelector("aside");

  let isMenuOpen = false;

  if (hamburger && aside) {
    hamburger.addEventListener("click", () => {
      if (!isMenuOpen) {
        aside.style.display = "block";
        document.body.classList.add("no-scroll");  // 👈 prevent scroll
        hamburger.innerHTML = '<span class="material-symbols-outlined">close</span>';
        isMenuOpen = true;
      } else {
        aside.style.display = "none";
        document.body.classList.remove("no-scroll");  // 👈 allow scroll again
        hamburger.innerHTML = '<span class="material-symbols-outlined">sort</span>';
        isMenuOpen = false;
      }
    });
  }

});



