const gameBoard = document.getElementById('game-board');
const movesElement = document.getElementById('moves');
const restartButton = document.getElementById('restart-btn');

const cardIcons = [
  '🍎', '🍌', '🍇', '🍓',
  '🍒', '🍍', '🥝', '🍉'
];

let moves = 0;
let firstCard = null;
let secondCard = null;
let lockBoard = false;

// Função para embaralhar as cartas
function shuffleCards() {
  return [...cardIcons, ...cardIcons]
    .sort(() => Math.random() - 0.5)
    .map(icon => createCard(icon));
}

// Função para criar cada carta
function createCard(icon) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.icon = icon;
  card.innerHTML = `<span class="icon">${icon}</span>`;
  card.addEventListener('click', flipCard);
  return card;
}

// Função para virar a carta
function flipCard() {
  if (lockBoard || this === firstCard) return;

  this.classList.add('flipped');

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

// Função para verificar se as cartas combinam
function checkForMatch() {
  lockBoard = true;
  moves++;
  movesElement.textContent = moves;

  if (firstCard.dataset.icon === secondCard.dataset.icon) {
    disableCards();
  } else {
    unflipCards();
  }
}

// Função para desabilitar as cartas após uma correspondência
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

// Função para desvirar as cartas quando não houver correspondência
function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
    resetBoard();
  }, 1000);
}

// Função para resetar o tabuleiro
function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Função para reiniciar o jogo
function restartGame() {
  moves = 0;
  movesElement.textContent = moves;
  firstCard = null;
  secondCard = null;
  lockBoard = false;

  // Limpa o tabuleiro
  gameBoard.innerHTML = '';

  // Reembaralha e adiciona as cartas novamente
  const shuffledCards = shuffleCards();
  shuffledCards.forEach(card => gameBoard.appendChild(card));
}

// Adiciona o evento de clique no botão de reinício
restartButton.addEventListener('click', restartGame);

// Inicializa o tabuleiro com as cartas embaralhadas
restartGame();
