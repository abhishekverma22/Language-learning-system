import { auth, db } from '../firebase-config.js';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {

  // 🔒 Auth state check
  onAuthStateChanged(auth, async (user) => {

    //  check user is present or not 
    if (user) {
      const uid = user.uid;
      // Reference  to firestore user document.
      const userDocRef = doc(db, "users", uid);
      const userSnapShort = await getDoc(userDocRef);

      if (userSnapShort.exists()) {
        const userData = userSnapShort.data();
        const userNameInUI = document.getElementById("user-name");
       userNameInUI.innerText = `${userData.firstName}`;

      }

    } else {
      window.location.replace('../html/login-page.html');
    }
  })

  // 🔓 Logout button
  const logoutBtn = document.getElementById("logout-btn");
  
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      if (confirm("Are you sure you want to logout?")) {
        try {
          await signOut(auth);
          window.location.replace('../html/login-page.html');
        } catch (error) {
          console.error("Logout failed:", error.message);
        }
      }
    });
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





