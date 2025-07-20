let sentenceByAI = document.getElementById("sentenceByAI");
let sentenceByUser = document.getElementById("sentenceByUser");
let micBtn = document.getElementById("mic-icon");
let feedbackPara = document.getElementById("show-feedback");
let language = document.getElementById("languageSelect");

let lanCode = null

language.addEventListener("change", (e) => {
  e.preventDefault()
  lanCode = e.target.value
})



// ✅ Example sentence (only alphabets will be compared)
const sentence = "pratham";
sentenceByAI.innerText = sentence;

// Speech Recognition setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  alert("Sorry, your browser does not support speech recognition.");
} else {
  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  let isListening = false;

  micBtn.addEventListener('click', () => {
    if (isListening) return;

    
    feedbackPara.textContent = "";
    feedbackPara.className = "feedback-box";
    sentenceByUser.textContent = "....";

    recognition.start();
    isListening = true;
  });

  recognition.onresult = (event) => {
    const spokenText = event.results[0][0].transcript.trim();
    sentenceByUser.textContent = spokenText;

    // ✅ Normalize both strings: remove all non-alphabet characters and convert to lowercase
    const normalize = str => str.toLowerCase().replace(/[^a-z]/g, "");

    const normalizedSpoken = normalize(spokenText);
    const normalizedExpected = normalize(sentence);

    if (normalizedSpoken === normalizedExpected) {
      feedbackPara.textContent = "✅ Great Job!";
      feedbackPara.style.color = "green";
    } else {
      feedbackPara.textContent = "❌ Try Again";
      feedbackPara.style.color = "red";
    }
  };

  recognition.onerror = (event) => {
    feedbackPara.textContent = "❌ Error: " + event.error;
    feedbackPara.style.color = "red";
    isListening = false;
  };

  recognition.onend = () => {
    isListening = false;
  };
}