import { auth } from '../firebase-config.js';
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {

  // 🔒 Auth state check
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.replace('../html/login-page.html');
    } else {
      console.log("Logged in as: ---> ", user.email);
    }
  });

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
  const body = document.body;
  const hamburger = document.getElementById("hamburger");
  const aside = document.querySelector("aside");

  let isMenuOpen = false;

  if (hamburger && aside) {
    hamburger.addEventListener("click", () => {
      if (!isMenuOpen) {
        aside.style.display = "block";
        body.style.overflow = "hidden";
        // 🔁 Change icon to close
        hamburger.innerHTML = '<span class="material-symbols-outlined">close</span > ';
        isMenuOpen = true;
      } else {
        aside.style.display = "none";
        body.style.overflow = "auto";
        // 🔁 Change icon back to menu
        hamburger.innerHTML = '<span class="material-symbols-outlined">sort</span>';
        isMenuOpen = false;
      }
    });
  }










  // progress bar



});
