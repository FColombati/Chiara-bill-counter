// Mostra la data di oggi
const todayEl = document.getElementById("today");
const counterEl = document.getElementById("counter");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const resetBtn = document.getElementById("resetBtn");

const today = new Date();
todayEl.textContent = "Oggi è " + today.toLocaleDateString("it-IT");

// Recupera i dati salvati
let answers = JSON.parse(localStorage.getItem("answers")) || {};

// Aggiorna contatore mensile
function updateCounter() {
  const month = today.getMonth();
  let count = 0;
  for (let date in answers) {
    let d = new Date(date);
    if (d.getMonth() === month && answers[date] === "yes") {
      count++;
    }
  }
  counterEl.textContent = `Questo mese hai risposto "Sì" ${count} volte`;
}

// Pulsanti
yesBtn.addEventListener("click", () => {
  answers[today.toDateString()] = "yes";
  localStorage.setItem("answers", JSON.stringify(answers));
  updateCounter();
});

noBtn.addEventListener("click", () => {
  answers[today.toDateString()] = "no";
  localStorage.setItem("answers", JSON.stringify(answers));
  updateCounter();
});

resetBtn.addEventListener("click", () => {
  if (confirm("Vuoi azzerare i dati del mese?")) {
    answers = {};
    localStorage.setItem("answers", JSON.stringify(answers));
    updateCounter();
  }
});

// Inizializza contatore
updateCounter();

// ------------------- NOTIFICHE -------------------
async function askPermission() {
  if ("Notification" in window) {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Permesso notifiche concesso");
      scheduleDailyNotification();
    }
  }
}

function scheduleDailyNotification() {
  // Notifica immediata di test
  new Notification("Domanda del giorno", {
    body: "Hai fatto la tua azione oggi? Apri e rispondi!"
  });
}

// Chiede subito il permesso
askPermission();

// ------------------- SERVICE WORKER -------------------
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
    .then(() => console.log("Service Worker registrato"))
    .catch(err => console.log("Errore Service Worker:", err));
}
