// Selecting Elements
const score0El = document.querySelector("#score--0"),
  score1El = document.querySelector("#score--1"),
  diceEl = document.querySelector(".dice"),
  btnNew = document.querySelector(".btn--new"),
  btnRoll = document.querySelector(".btn--roll"),
  btnHold = document.querySelector(".btn--hold"),
  current0El = document.querySelector("#current--0"),
  current1El = document.querySelector("#current--1"),
  player0El = document.querySelector(".player--0"),
  player1El = document.querySelector(".player--1");

let scores, currentScore, activePlayer, playing;
const init = function () {
  // Default Value For Game Cndition
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  diceEl.classList.add("hidden");
  score0El.textContent = "0";
  score1El.textContent = "0";
  current0El.textContent = "0";
  current1El.textContent = "0";
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
init();

btnRoll.addEventListener("click", handelRoll);
function handelRoll() {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      textCurrentScore(currentScore);
    } else {
      switchPlayer();
    }
  }
}

btnHold.addEventListener("click", () => {
  if (playing) {
    scores[activePlayer] += currentScore;
    textScore(activePlayer, scores[activePlayer]);
    if (scores[activePlayer] >= 30) {
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);

const switchPlayer = function () {
  textCurrentScore("0");
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  changeBackGround();
};

const changeBackGround = function () {
  // Remove Class Active From All
  document
    .querySelectorAll(".player")
    .forEach((el) => el.classList.remove("player--active"));
  // Add Class Active For Playing
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--active");
};

const textCurrentScore = function (text) {
  document.querySelector(`#current--${activePlayer}`).textContent = text;
};

const textScore = function (index, text) {
  document.querySelector(`#score--${index}`).textContent = text;
};
