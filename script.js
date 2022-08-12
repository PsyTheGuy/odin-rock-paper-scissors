// controls the style of cards when clicked
function selectCard() {
  this.classList.add('selected');
  setTimeout(() => this.classList.remove('selected'), 4000);
}

// turns off mouse pointer events on cards
function disableCards(ms) {
  cards.forEach(card => card.classList.add('disabled'));
  setTimeout(() => cards.forEach(card => card.classList.remove('disabled')), ms);
}

// controls the opening and closing of the 'panel'
function togglePanel(panel) {
  if (panel.classList.contains('open')) {
    window.setTimeout(() => panel.style.display = 'none', 1000);
    panel.classList.toggle('open');
  } else {
    panel.style.display = 'block';
    window.setTimeout(() => panel.classList.toggle('open'), 10);
  };
}

// updates the 'text' appearing on the 'element'
function updateText(element, text, ms=2000) {
  if (element.classList.contains('visible')) {
    element.classList.toggle('visible');
    setTimeout(() => {
      element.textContent = text;
      element.classList.toggle('visible');
    }, ms);
  } else {
    element.textContent = text;
    element.classList.toggle('visible');
    setTimeout(() => element.classList.toggle('visible'), ms);
  };
}

// counts down from 'startNum' to 0 and updates 'inGameMessage'
function countDown(startNum) {
  let countDownTimer = startNum;
  const intervalID = setInterval(() => {
    if (countDownTimer > 0) {
      updateText(inGameMessage, countDownTimer, 800);
      countDownTimer--;
    } else {
      clearInterval(intervalID);
    };
  }, 1000);
}

// reveals the announcement overlay with 'text' content
function overlayAnnounce(text) {
  disableCards(3000);
  overlayMessage.textContent = text;
  overlay.style.display = 'block';
  setTimeout(() => overlay.style.display = 'none', 3000);
}

// return a random choice
function getComputerChoice() {
  const choiceList = ['Rock', 'Paper', 'Scissors'];    
  const choiceIndex = Math.floor(Math.random() * 3);
  return choiceList[choiceIndex];
}

// decide the winner of a round and update text accordingly
function getWinner(playerSelection, computerSelection) {
  if (playerSelection == 'Rock' && computerSelection == 'Scissors' ||
      playerSelection == 'Paper' && computerSelection == 'Rock' ||
      playerSelection == 'Scissors' && computerSelection == 'Paper') {
    playerScore += 1;
    updateText(inGameMessage, `You won the round! ${playerSelection} beats ${computerSelection.toLowerCase()}.`);
    updateText(playerScoreText, playerScore, 200);
  } else if (playerSelection === computerSelection) {
    updateText(inGameMessage, `It's a tie! Both selected ${playerSelection.toLowerCase()}.`);
  } else {
    computerScore += 1;
    updateText(inGameMessage, `Computer won the round! ${computerSelection} beats ${playerSelection.toLowerCase()}.`);
    updateText(computerScoreText, computerScore, 200);
  };
}

// control the events when the player plays a round
function playRound() {
  const playerSelection = this.innerText;
  const computerSelection = getComputerChoice();

  disableCards(6500);
  countDown(3);
  setTimeout(getWinner, 4000, playerSelection, computerSelection);
  (roundNumber == 5) ? setTimeout(endGame, 6500) : setTimeout(continueGame, 6500);
}

// control the events when the player starts the game
function startGame() {
  playerScore = 0;
  computerScore = 0;
  roundNumber = 1;

  updateText(playerScoreText, playerScore, 200);
  updateText(computerScoreText, computerScore, 200);

  togglePanel(preGamePanel);
  setTimeout(() => {
    togglePanel(scorePanel);
    togglePanel(inGamePanel);
  }, 1200);
  setTimeout(overlayAnnounce, 2200, `Round: ${roundNumber}`);
  
  cards.forEach(card => card.addEventListener('click', playRound));
  cards.forEach(card => card.addEventListener('click', selectCard));
}

// control the events if the current round was not the last
function continueGame() {
  roundNumber++; 
  overlayAnnounce(`Round: ${roundNumber}`)
}

// control the events when the game ends
function endGame() {
  disableCards(4000);

  if (playerScore > computerScore) {
    overlayAnnounce('You won the game!');
  } else if (computerScore > playerScore) {
    overlayAnnounce('Computer won the game!');
  } else {
    overlayAnnounce('The game ended in a tie!');
  };

  setTimeout(() => {
    togglePanel(scorePanel);
    togglePanel(inGamePanel);    
  }, 3000);
  setTimeout(() => {
    togglePanel(preGamePanel);
  }, 4200);
}

let playerScore = 0;
let computerScore = 0;
let roundNumber = 1;

// panel elements
const scorePanel = document.getElementById('score-panel');
const preGamePanel = document.getElementById('pregame-panel');
const inGamePanel = document.getElementById('ingame-panel');
// containers elements
const scoreUI = document.getElementById('score-ui');
const preGameUI = document.getElementById('pregame-ui');
const inGameUI = document.getElementById('ingame-ui');
// text elements
const playerScoreText = document.getElementById('player-score');
const computerScoreText = document.getElementById('computer-score');
const inGameMessage = document.getElementById('ingame-msg');
const overlayMessage = document.querySelector('.overlay-msg');
// other ui elements
const cards = document.querySelectorAll('.card');
const startBtn = document.querySelector('.start-btn');
const overlay = document.querySelector('.overlay');

window.addEventListener('load', () => {
  togglePanel(preGamePanel);
  startBtn.addEventListener('click', startGame);
}, 'once');
