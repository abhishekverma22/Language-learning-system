import { auth } from '../firebase-config.js';
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";


document.addEventListener("DOMContentLoaded", () => {

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.replace('../html/login-page.html')
    } else {
      console.log("Logged in as: ---> ", user.email);
    }
  })

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {

      if (confirm("Are your sure you want to logout")) {

        try {

          await signOut(auth);
          window.location.replace('../html/login-page.html')

        } catch (error) {
          console.error("Logout failed:", error.message);
        }

      }

    })


  }





})