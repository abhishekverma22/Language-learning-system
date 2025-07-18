import { rtdb, auth } from "../firebase-config.js";
import { ref, get } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

onAuthStateChanged(auth, async (user) => {
  if (user) {

    const param = new URLSearchParams(window.location.search);
    const language = param.get("lang") || param.get("lang ").trim();

 



  }
  else {
    window.location.replace('../html/login-page.html');
  }
})



