// 1. Variabili di stato (tengono traccia di cosa succede nel gioco)
let score = 0;
let timeRemaining = 30;
let errors = 0;
let threatsFound = 0;
let timerInterval;

// 2. Funzione per iniziare il gioco (si attiva quando clicchi "INICIAR ESCANEO")
function startGame() {
    // Cambiamo le schermate: nascondiamo l'intro e mostriamo il gioco
    document.getElementById('intro-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    document.getElementById('stats-panel').classList.remove('hidden');

    // Resettiamo i valori per una nuova partita
    score = 0;
    timeRemaining = 30;
    errors = 0;
    threatsFound = 0;

    // Aggiorniamo i numeri che vede l'utente
    updateDisplay();

    // Facciamo partire il cronometro
    startTimer();
}

// 3. Funzione del Cronometro
function startTimer() {
    // Puliamo eventuali timer vecchi per sicurezza
    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        timeRemaining--; // Toglie 1 secondo
        document.getElementById('timer-display').innerText = timeRemaining;

        // Se il tempo finisce, stop al gioco
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

// 4. Funzione per aggiornare i testi (Punteggio e Minacce)
function updateDisplay() {
    document.getElementById('score-display').innerText = score;
    document.getElementById('threats-found').innerText = threatsFound;
}

// 5. Funzione per gestire i clic sull'immagine (La scansione)
document.getElementById('game-image').addEventListener('click', function(e) {
    if (timeRemaining <= 0) return; // Se il tempo è finito, non fare nulla

    // Logica di simulazione (per ora cliccando aumenti le minacce)
    // In futuro qui metteremo le coordinate precise
    if (threatsFound < 5) {
        score += 10;
        threatsFound++;
        updateDisplay();

        if (threatsFound === 5) {
            endGame();
        }
    } else {
        // Se l'utente clicca ma ha già trovato tutto (o clicca fuori)
        errors++;
        score -= 2;
        updateDisplay();
    }
});

// 6. Funzione finale (Mostra i risultati)
function endGame() {
    clearInterval(timerInterval);
    
    // Mostriamo la schermata dei risultati
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('results-screen').classList.remove('hidden');

    // Scriviamo i risultati finali nei box
    document.getElementById('final-score').innerText = score;
    document.getElementById('final-found').innerText = threatsFound;
    document.getElementById('final-errors').innerText = errors;
    document.getElementById('final-time').innerText = (30 - timeRemaining) + "s";
}

// 7. Funzione per ricominciare (Tasto "REINTENTAR")
function resetGame() {
    document.getElementById('results-screen').classList.add('hidden');
    document.getElementById('stats-panel').classList.add('hidden');
    document.getElementById('intro-screen').classList.remove('hidden');
}

const translations = {

    es: {
        challenge_title: "Simulador Táctico",
        challenge_sub: "Táctico",
        challenge_label: "Security Awareness Challenge",
        challenge_desc: "Pon a prueba tus habilidades de observación táctica. Identifica las amenazas de seguridad ocultas en las escenas antes de que se agote el tiempo.",
        back_home: "← Volver al inicio"
    },

    en: {
        challenge_title: "Tactical Simulator",
        challenge_sub: "Tactical",
        challenge_label: "Security Awareness Challenge",
        challenge_desc: "Test your tactical observation skills. Identify hidden security threats in the scenes before time runs out.",
        back_home: "← Back Home"
    }
};


// funzione lingua
function setLanguage(lang) {
    localStorage.setItem("lang", lang);

    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
}

// carica lingua salvata
const savedLang = localStorage.getItem("lang") || "es";
setLanguage(savedLang);


