const rollDice = document.getElementById("roll-dice");
const de = document.getElementById("de");
const holdButton = document.getElementById("hold");
const replayButton = document.getElementById("replay");
const player1 = document.querySelector(".player-1");
const player2 = document.querySelector(".player-2");
const score1 = document.getElementById("score-1");
const score2 = document.getElementById("score-2");
const global1 = document.getElementById("global-1");
const global2 = document.getElementById("global-2");
const resetButton = document.getElementById("reset");
const finalScore = document.querySelector(".final-score");

let activePlayer = 1;
let score = 0;
let globalScore1 = 0;
let globalScore2 = 0;
let isGameActive = true; // Ajouter une variable pour vérifier si la partie est en cours

function genererNombreAleatoire() {
  return Math.floor(Math.random() * 6) + 1;
}

function holdScore() {
  if (!isGameActive) {
    return; // Si la partie est terminée, ne rien faire
  }

  if (activePlayer === 1) {
    globalScore1 += score;
    global1.textContent = globalScore1;
    score = 0;
    score1.textContent = score;
    if (globalScore1 >= 100) {
      endGame(player1);
      return;
    }
    activePlayer = 2;
    player1.classList.remove("active");
    player2.classList.add("active");
  } else if (activePlayer === 2) {
    globalScore2 += score;
    global2.textContent = globalScore2;
    score = 0;
    score2.textContent = score;
    if (globalScore2 >= 100) {
      endGame(player2);
      return;
    }
    activePlayer = 1;
    player2.classList.remove("active");
    player1.classList.add("active");
  }
}
function updateFinalScores() {
  const finalScore1Element = document.getElementById("final-score-1");
  const finalScore2Element = document.getElementById("final-score-2");

  finalScore1Element.textContent = globalScore1;
  finalScore2Element.textContent = globalScore2;
}

function endGame(winner) {
  isGameActive = false; // La partie est terminée
  winner.classList.add("winner");
  rollDice.disabled = true; // Désactiver le bouton "Lancer le dé"
  holdButton.disabled = true; // Désactiver le bouton "Tenir"
  replayButton.style.display = "block"; // Afficher le bouton "Revanche"

  // Sauvegarder les scores dans le stockage local
  localStorage.setItem("globalScore1", globalScore1);
  localStorage.setItem("globalScore2", globalScore2);
  // Sauvegarder les scores finaux dans le stockage local
  localStorage.setItem("globalScore1", globalScore1);
  localStorage.setItem("globalScore2", globalScore2);

  // Mettre à jour les scores finaux sur la page
  updateFinalScores();
  updateFinalScores();
}

function startNewGame() {
  activePlayer = 1;
  score = 0;
  // Charger les scores depuis le stockage local s'ils existent
  globalScore1 = localStorage.getItem("globalScore1") || 0;
  globalScore2 = localStorage.getItem("globalScore2") || 0;
  isGameActive = true;
  player1.classList.remove("active", "winner");
  player2.classList.remove("active", "winner");
  rollDice.disabled = false; // Activer le bouton "Lancer le dé"
  holdButton.disabled = false; // Activer le bouton "Tenir"
  replayButton.style.display = "none"; // Cacher le bouton "Revanche"

  score1.textContent = score;
  score2.textContent = score;
  global1.textContent = globalScore1;
  global2.textContent = globalScore2;
  updateFinalScores();
}

rollDice.addEventListener("click", () => {
  const nombreAleatoire = genererNombreAleatoire();
  de.src = `https://assets.codepen.io/1279739/dice-${nombreAleatoire}.png `;

  if (nombreAleatoire === 1) {
    score = 0;
    holdScore();
  } else {
    score += nombreAleatoire;
    if (activePlayer === 1) {
      score1.textContent = score;
    } else if (activePlayer === 2) {
      score2.textContent = score;
    }
  }
});

holdButton.addEventListener("click", holdScore);

replayButton.addEventListener("click", startNewGame);
window.addEventListener("load", () => {
  // Charger les scores finaux depuis le stockage local s'ils existent
  globalScore1 = parseInt(localStorage.getItem("globalScore1")) || 0;
  globalScore2 = parseInt(localStorage.getItem("globalScore2")) || 0;

  // Mettre à jour les scores finaux sur la page
  updateFinalScores();
});

resetButton.addEventListener("click", () => {
  globalScore1 = 0;
  globalScore2 = 0;
  localStorage.removeItem("globalScore1");
  localStorage.removeItem("globalScore2");
  updateFinalScores(); // Mettre à jour les scores finaux sur la page
});
