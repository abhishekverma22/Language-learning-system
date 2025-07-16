import { auth } from '../firebase-config.js';

import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

document.addEventListener('DOMContentLoaded', () => {

  const loginBtn = document.getElementById("login-btn");

  if (loginBtn) {
    loginBtn.addEventListener("click", async () => {
      const email = document.getElementById("login-email").value.trim();
      const password = document.getElementById("login-password").value.trim();
      const errorMessage = document.getElementById("error-message");

      if (!email || !password) {
        errorMessage.innerText = "Email and password are required.";
        return;
      }


      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        errorMessage.style.color = "green";
        errorMessage.textContent = "Login successful! Redirecting...";


        setTimeout(() => {
          window.location.href = "../html/dashboard-page.html";
        }, 1500)

        document.getElementById("login-email").value = "";
        document.getElementById("login-password").value = "";

      } catch (error) {
        errorMessage.style.color = "red";
        errorMessage.textContent = error.message

      }


    })


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






})