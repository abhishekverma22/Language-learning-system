import { auth, db } from '../firebase-config.js';
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js"
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

// track current user
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const currentUser = user.uid;

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


      const name = document.getElementById("feedback-name").value.trim();
      const email = document.getElementById("feedback-email").value.trim();
      const category = document.getElementById("feedback-category").value;
      const comment = document.getElementById("feedback-comments").value.trim();


    }


  } else {
    window.location.href = "../html/login-page.html"
  }

});



