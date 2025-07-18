import { auth, db } from '../firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";




onAuthStateChanged(auth, async (user) => {
  if (user) {

    const coursesCard = document.querySelectorAll('.course-card');
    coursesCard.forEach((card) => {
      card.addEventListener('click', () => {
        const selectLanguage = card.getAttribute('data-language');
        // console.log(selectLanguage)
        window.location.href = `../html/practice.html?lang = ${selectLanguage}`


      });

    });


  }
  else {
    window.location.replace('../html/login-page.html');
  }
})





















