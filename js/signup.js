import { auth, db } from '../firebase-config.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  const signupBtn = document.getElementById("signup-btn");

  if (signupBtn) {
    signupBtn.addEventListener("click", async () => {
      const firstName = document.getElementById("first-name").value.trim();
      const lastName = document.getElementById("last-name").value.trim();
      const email = document.getElementById("signup-email").value.trim();
      const password = document.getElementById("signup-password").value.trim();
      const errorMessage = document.getElementById("error-message");

      if (!firstName || !lastName || !email || !password) {
        errorMessage.textContent = 'All fields are required.';
        return;
      }

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
          firstName,
          lastName,
          email,
          createdAt: serverTimestamp()
        });

        errorMessage.style.color = "green";
        errorMessage.textContent = "Account create successful! Redirecting...";


        setTimeout(() => {
          window.location.href = "../html/login-page.html";
        }, 1500)

      } catch (error) {
        errorMessage.style.color = "green";
        errorMessage.innerText = error.message;
      }
    });
  }





  // hamburger 
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

});
