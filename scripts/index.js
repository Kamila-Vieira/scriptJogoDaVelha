import botScript from "../myScript/index.js";

const $body = document.querySelector("body");

const $fieldList = document.querySelectorAll(".field");

const $scoreBoardPlayer1 = document.querySelector(".score-player-1");
const $scoreBoardPlayer2 = document.querySelector(".score-player-2");

const $scoreBoardWinner = document.querySelector(".scoreboard-name");

const $userField1 = document.querySelector(".user-field-1");
const $userField2 = document.querySelector(".user-field-2");

const $playHistoricList = document.querySelector(".play-historic-list");

const $switcherMd = document.querySelector(".switcher-md");
const $switcherBot = document.querySelector(".switcher-bot");

const $mathHistocList = document.querySelector(".match-historic-list");
const $botVsBot = document.querySelector(".bot-vs-bot");

const line1 = [$fieldList[0], $fieldList[1], $fieldList[2]];
const line2 = [$fieldList[3], $fieldList[4], $fieldList[5]];
const line3 = [$fieldList[6], $fieldList[7], $fieldList[8]];

const column1 = [$fieldList[0], $fieldList[3], $fieldList[6]];
const column2 = [$fieldList[1], $fieldList[4], $fieldList[7]];
const column3 = [$fieldList[2], $fieldList[5], $fieldList[8]];

const diagonal1 = [$fieldList[0], $fieldList[4], $fieldList[8]];
const diagonal2 = [$fieldList[2], $fieldList[4], $fieldList[6]];

const fieldForTest = [line1, line2, line3, column1, column2, column3, diagonal1, diagonal2];

const fieldPositionNames = [
  "Primeiro",
  "Segundo",
  "Terceiro",
  "Quarto",
  "Quinto",
  "Sexto",
  "Setimo",
  "Oitavo",
  "Nono",
];

const playHistoricList = [];

let move = "X";
let scorePlayer1 = 0;
let scorePlayer2 = 0;
let gameRunning = true;
let botActive = true;
let md = 3;
let mathNumber = 0;
let botVsBot = false;

const toggleMove = () => (move == "X" ? (move = "O") : (move = "X"));

const verifyGame = () => {
  let result = "";

  for (const fieldList of fieldForTest) {
    if (
      fieldList[0].textContent !== "" &&
      fieldList[0].textContent === fieldList[1].textContent &&
      fieldList[1].textContent === fieldList[2].textContent
    ) {
      result = fieldList[0].textContent;
    }
  }

  if (
    $fieldList[0].textContent != "" &&
    $fieldList[1].textContent != "" &&
    $fieldList[2].textContent != "" &&
    $fieldList[3].textContent != "" &&
    $fieldList[4].textContent != "" &&
    $fieldList[5].textContent != "" &&
    $fieldList[6].textContent != "" &&
    $fieldList[7].textContent != "" &&
    $fieldList[8].textContent != "" &&
    result === ""
  ) {
    result = "draw";
  }

  return result;
};

const addPoint = (winner) => {
  if (winner == "X") {
    scorePlayer1++;
  } else if (winner == "O") {
    scorePlayer2++;
  }
};

const printScoreboard = () => {
  if (scorePlayer1 <= 9) {
    $scoreBoardPlayer1.textContent = "0" + scorePlayer1;
  } else {
    $scoreBoardPlayer1.textContent = scorePlayer1;
  }

  if (scorePlayer2 <= 9) {
    $scoreBoardPlayer2.textContent = "0" + scorePlayer2;
  } else {
    $scoreBoardPlayer2.textContent = scorePlayer2;
  }
};

const resetBattefield = () => {
  for (const $field of $fieldList) {
    $field.textContent = "";
  }
};

const resetScoreboard = () => {
  $scoreBoardPlayer1.textContent = "00";
  $scoreBoardPlayer2.textContent = "00";
  scorePlayer1 = 0;
  scorePlayer2 = 0;
};

const verifyMd = (winner) => {
  if (md === 3) {
    if (scorePlayer1 === 2 || scorePlayer2 === 2) {
      modal(`Jogador ${winner} ganhou`);
      resetScoreboard();
    }
  }
  if (md === 5) {
    if (scorePlayer1 === 3 || scorePlayer2 === 3) {
      modal(`Jogador ${winner} ganhou`);
      resetScoreboard();
    }
  }
};

const printWinnerName = (winner) => {
  if (winner == "X") {
    $scoreBoardWinner.textContent = $userField1.value;
  }
  if (winner == "O") {
    $scoreBoardWinner.textContent = $userField2.value;
  }
  if (winner == "draw") {
    $scoreBoardWinner.textContent = "Empatou";
  }
};

const printPlayHistoric = (fieldPosition) => {
  let playerName = "";

  if (move == "X") {
    playerName = $userField1.value;
  }
  if (move == "O") {
    playerName = $userField2.value;
  }

  const li = `<li class='play-historic-card'>
    <span class='play-historic-move'>${move}</span>
    <div class='play-historic-name-wrapper'>
      <span class='play-historic-player-name'>${playerName}</span>
      <span class='play-historic-move-name'>${fieldPosition} quadrado</span>
    </div>
  </li>`;

  $playHistoricList.innerHTML += li;

  handleClickPlayHistoric();
  addPlayHistoricList();
};

const handleClickPlayHistoric = () => {
  const $playHistoricCardList = document.querySelectorAll(".play-historic-card");

  for (let i = 0; i < $playHistoricCardList.length; i++) {
    const $card = $playHistoricCardList[i];

    $card.addEventListener("click", function () {
      printHistoricOnBoard(i);
    });
  }
};

const addPlayHistoricList = () => {
  const $fieldList = document.querySelectorAll(".field");

  const newHistoric = [];

  for (const $field of $fieldList) {
    newHistoric.push($field.textContent);
  }

  playHistoricList.push(newHistoric);
};

const printHistoricOnBoard = (index) => {
  const $fieldList = document.querySelectorAll(".field");

  for (let i = 0; i < playHistoricList[index].length; i++) {
    $fieldList[i].textContent = playHistoricList[index][i];
  }
};

const printMathHistoric = () => {
  const winner = verifyGame();

  const winnerName = getPlayerName(winner);

  const li = `<li class='match-historic-item'>
  <div class='match-historic-winner-box'>
    <span class='match-historic-winner-title'>Vencedor</span>
    <span class='match-historic-winner'>${winnerName}</span>
  </div>
  <span class='match-historic-separator'>Cenário</span>
  <div class='match-historic-board'></div>
</li>`;

  $mathHistocList.innerHTML += li;

  const $mathHistoricBoard = document.querySelectorAll(".match-historic-board");

  const $boardFieldList = document.querySelectorAll(".field");

  for (const $field of $boardFieldList) {
    const moveText = $field.textContent;

    $mathHistoricBoard[
      mathNumber
    ].innerHTML += `<span class='match-historic-board-item'>${moveText}</span>`;
  }

  mathNumber++;
};

const getPlayerName = (player) => {
  if (player == "X") return $userField1.value;
  if (player == "O") return $userField2.value;
};

const resetPlayHistoric = () => {
  $playHistoricList.innerHTML = "";
  playHistoricList.length = 0;
};

const modal = (text) => {
  const modalContainer = document.createElement("div");
  modalContainer.classList.add("container-modal");

  const modalElement = document.createElement("div");
  modalElement.classList.add("modal");

  const modalText = document.createElement("p");
  modalText.classList.add("modal-text");
  modalText.textContent = text;

  const modalButton = document.createElement("button");
  modalButton.classList.add("modal-button");
  modalButton.textContent = "Ok";

  modalContainer.appendChild(modalElement);
  modalElement.appendChild(modalText);
  modalElement.appendChild(modalButton);

  modalButton.addEventListener("click", function () {
    modalContainer.remove();
  });

  modalContainer.addEventListener("click", function (event) {
    if (!event.target.classList.contains("container-modal")) return;
    modalContainer.remove();
  });

  $body.appendChild(modalContainer);
};

const bot = () => {
  const scenery = [...$fieldList].map(($field) => $field.textContent);

  const botMove = botScript(scenery, move);

  if (!botPlayTest(botMove)) return;

  const $fieldBot = document.querySelector(`.field-${botMove}`);

  $fieldBot.textContent = move;
  const winner = verifyGame();
  const winnerName = getPlayerName(winner);
  printPlayHistoric(fieldPositionNames[botMove]);
  toggleMove();
  addPoint(winner);
  printScoreboard();
  if (winner != "") {
    // verifyMd(winnerName);
    printWinnerName(winner);
    gameRunning = false;
    setTimeout(() => {
      gameRunning = true;
      printMathHistoric();
    }, 1000);
    setTimeout(resetBattefield, 1000);
    setTimeout(resetPlayHistoric, 1000);
  }
};

const botPlayTest = (index) => {
  if (typeof index !== "number") return modal("O bot não retornou um número");

  if (index > 8) return modal("ERROR: Number is too big");
  if (index < 0) return modal("ERROR: Number is too small");
  if (index % 1 !== 0) return modal("ERROR: The number is not an integer");
  if ($fieldList[index]?.textContent)
    modal(`O bot ${move} tentou jogar na cada de index ${index} que já foi jogada`);

  return true;
};

for (let i = 0; i < $fieldList.length; i++) {
  const $field = $fieldList[i];

  $field.addEventListener("click", () => {
    if ($field.textContent != "" || gameRunning == false) return;
    $field.textContent = move;
    const winner = verifyGame();
    const winnerName = getPlayerName(winner);
    printPlayHistoric(fieldPositionNames[i]);
    toggleMove();
    addPoint(winner);
    printScoreboard();
    if (winner != "") {
      // verifyMd(winnerName);
      printWinnerName(winner);
      gameRunning = false;
      move = "X";
      setTimeout(function () {
        gameRunning = true;
        printMathHistoric();
      }, 1000);
      setTimeout(resetBattefield, 1000);
      setTimeout(resetPlayHistoric, 1000);
      return
    }
    if (botActive) bot();
  });
}

$switcherBot.addEventListener("click", () => {
  $switcherBot.classList.toggle("switcher-on");
  botActive = !botActive;

  if (botActive) {
    $userField2.value = "Bot";
    $userField2.disabled = true;
  } else {
    $userField2.value = "";
    $userField2.disabled = false;
  }
});

$switcherMd.addEventListener("click", () => {
  $switcherMd.classList.toggle("switcher-on");

  md === 3 ? (md = 5) : (md = 3);
});

$botVsBot.addEventListener("click", () => {
  botVsBot = !botVsBot
  if (!botVsBot) return
  botMatch();
  $userField1.value = 'Bot X'
  $userField2.value = 'Bot O'
  $userField1.setAttribute('disabled', true)
  $userField2.setAttribute('disabled', true)
});

const botMatch = () => {
  const $modal = document.querySelector(".container-modal");

  if ($modal || !botVsBot) return;

  setTimeout(() => {
    bot();
    botMatch();
  }, 1000);
};
