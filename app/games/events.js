('use strict');

const gamesApi = require('./api.js');
const gamesUi = require('./ui.js');
const getFormFields = require('../../lib/get-form-fields.js');
const store = require('../store.js');
const app = require('../app.js');

// const player1Array = {
//   symbol: 'X',
//   image: '../../images/XBugs.png',
//   winImage: '../../images/XBugs.png',
// };

// const player2Array = {
//   symbol: 'O',
//   image: '../../images/OBugs.png',
//   winImage: '../../images/OBugs.png',
// };

const player1 = 'X';
const player2 = 'O';
const player1Image = '../../images/XBugs.png';
const player2Image = '../../images/OBugs.png';

const player1WinImage = '../../images/YouWinXBugNoBackground.png';
const player2WinImage = '../../images/YouWinOBugNoBackground.png';
let currentGameArray = ['', '', '', '', '', '', '', ''];

const board = currentGameArray;

let currentPlayer = player1;
store.currentPlayer = currentPlayer;

let currentPlayerImage = player1Image;
store.currentPlayerImage = currentPlayerImage;

let currentPlayerWinImage = player1WinImage;
store.currentPlayerWinImage = currentPlayerWinImage;

let winner;

//const setTie = function () {};

let winStatus = false;
const winConditionMet = function () {
  if (winStatus) {
    console.log('you are in winconditionmet');
    winner = currentPlayer;
    $('#winner-header').css('display', 'inherit');
    $('#winner-header').html(
      `<img src="${store.currentPlayerWinImage}" width="400px">`
    );
    currentGameArray = ['', '', '', '', '', '', '', ''];
    winStatus = false;
  }
};

const setWinStatus = function () {
  if (
    currentGameArray[0] == currentPlayer &&
    currentGameArray[1] == currentPlayer &&
    currentGameArray[2] == currentPlayer
  ) {
    console.log('012 is the winner!');
    winStatus = true;
  } else if (
    currentGameArray[3] === currentPlayer &&
    currentGameArray[4] === currentPlayer &&
    currentGameArray[5] === currentPlayer
  ) {
    console.log('345 is the winner!');
    winStatus = true;
  } else if (
    currentGameArray[6] === currentPlayer &&
    currentGameArray[7] === currentPlayer &&
    currentGameArray[8] === currentPlayer
  ) {
    console.log('678 is the winner');
    winStatus = true;
  } else if (
    currentGameArray[0] === currentPlayer &&
    currentGameArray[3] === currentPlayer &&
    currentGameArray[6] === currentPlayer
  ) {
    console.log('036 is the winner');
    winStatus = true;
  } else if (
    currentGameArray[1] === currentPlayer &&
    currentGameArray[4] === currentPlayer &&
    currentGameArray[7] === currentPlayer
  ) {
    console.log('147 is the winner');
    winStatus = true;
  } else if (
    currentGameArray[2] === currentPlayer &&
    currentGameArray[5] === currentPlayer &&
    currentGameArray[8] === currentPlayer
  ) {
    console.log('258 is the winner');
    winStatus = true;
  } else if (
    currentGameArray[0] === currentPlayer &&
    currentGameArray[4] === currentPlayer &&
    currentGameArray[8] === currentPlayer
  ) {
    console.log('048 is the winner');
    winStatus = true;
  } else if (
    currentGameArray[2] === currentPlayer &&
    currentGameArray[4] === currentPlayer &&
    currentGameArray[6] === currentPlayer
  ) {
    console.log('246 is the winner');
    winStatus = true;
  } else if (
    board[0] !== '' &&
    board[1] !== '' &&
    board[2] !== '' &&
    board[3] !== '' &&
    board[4] !== '' &&
    board[5] !== '' &&
    board[6] !== '' &&
    board[7] !== '' &&
    board[8] !== ''
  ) {
    console.log('tie it up');
  }
};

const togglePlayerImage = () => {
  if (currentPlayerImage === player1Image) {
    currentPlayerImage = player2Image;
  } else currentPlayerImage = player1Image;
  store.currentPlayerImage = currentPlayerImage;
};

const togglePlayer = () => {
  if (currentPlayer === player1) {
    currentPlayer = player2;
  } else currentPlayer = player1;
  store.currentPlayer = currentPlayer;
};

const togglePlayerWinImage = () => {
  if (currentPlayerWinImage === player1WinImage) {
    currentPlayerWinImage = player2WinImage;
  } else currentPlayerWinImage = player1WinImage;
  store.currentPlayerWinImage = currentPlayerWinImage;
};

const onNewGames = event => {
  currentPlayer = player1;
  currentPlayerImage = player1Image;
  currentPlayerWinImage = player1WinImage;
  console.log(currentPlayer, currentPlayerImage);
  gamesApi
    .newGames()
    .then(response => gamesUi.onNewGamesSuccess(response))
    .catch(() => gamesUi.onNewGamesFailure());
};
// function to update box and player image
const onUpdateGames = event => {
  let boxClicked = $(event.target).data('index');

  if (winStatus === true) {
    $('#error-status').html('<p>Click RESTART to start a new game.</p>');
  } else if (boxClicked === undefined) {
    boxClicked = $(event.target.parentElement).data('index');
    store.boxClicked = boxClicked;
    console.log(store);
  } else if (
    store.game.cells[boxClicked]?.includes('X') ||
    store.game.cells[boxClicked]?.includes('O')
  ) {
    console.log('Choose a new square');
  } else {
    $(event.target).html(
      `<img src="${store.currentPlayerImage}" height="120px" width="120px">`
    );

    currentGameArray[boxClicked] = currentPlayer;

    setWinStatus();

    // winConditionMet();

    const updateBoard = {
      game: {
        cell: {
          index: boxClicked,
          value: currentPlayer,
        },
        over: winStatus,
      },
    };

    gamesApi
      .updateGame(updateBoard)

      .then(response => gamesUi.onUpdateGamesSuccess(response))

      .catch(() => gamesUi.onNewGamesFailure());

    winConditionMet();
    togglePlayer();
    togglePlayerImage();
    togglePlayerWinImage();
  }
};

module.exports = {
  onNewGames,
  onUpdateGames,
};
