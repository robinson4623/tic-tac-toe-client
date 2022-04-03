('use strict');

const gamesApi = require('./api.js');
const gamesUi = require('./ui.js');
const getFormFields = require('../../lib/get-form-fields.js');
const store = require('../store.js');
const app = require('../app.js');

// const player1Array = {
//   symbol: 'X',
//   image: '../../images/XBugs.png',
//   winImage: 'public/YouWinXBugNoBackground.png',
// };

// const player2Array = {
//   symbol: 'O',
//   image: '../../images/OBugs.png',
//   winImage: 'public/YouWinOBugNoBackground.png',
// };

const player1 = 'X';
const player2 = 'O';
const player1Image = 'public/XBugs.png';
const player2Image = 'public/OBugs.png';
const playerTieImage = 'public/BugsTie.png';

const player1WinImage = 'public/YouWinXBugNoBackground.png';
const player2WinImage = 'public/YouWinOBugNoBackground.png';
let currentGameArray = ['', '', '', '', '', '', '', '', ''];

const board = currentGameArray;

let currentPlayer = player1;
store.currentPlayer = currentPlayer;

let currentPlayerImage = player1Image;
store.currentPlayerImage = currentPlayerImage;

let currentPlayerWinImage = player1WinImage;
store.currentPlayerWinImage = currentPlayerWinImage;

let winner;

let isTie = false;

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
  } else if (isTie === true) {
    console.log('tie');
    $('#winner-header').css('display', 'inherit');
    $('#winner-header').html(`<img src="${playerTieImage}" width="600px">`);
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
    currentGameArray[0] !== '' &&
    currentGameArray[1] !== '' &&
    currentGameArray[2] !== '' &&
    currentGameArray[3] !== '' &&
    currentGameArray[4] !== '' &&
    currentGameArray[5] !== '' &&
    currentGameArray[6] !== '' &&
    currentGameArray[7] !== '' &&
    currentGameArray[8] !== ''
  ) {
    isTie = true;
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

const onNewGames = () => {
  // set player board and images to 'none' on new game
  $('.container-board .box').css('display', 'none');
  $('.container-board .box').html('');
  $('#winner-header').html('');
  $('#error-status').html('');
  // set all game data to 'none' on new game
  store.response = null;
  store.game = null;
  currentPlayer = player1;
  currentPlayerImage = player1Image;
  currentPlayerWinImage = player1WinImage;
  store.currentPlayerImage = player1Image;
  currentGameArray = ['', '', '', '', '', '', '', '', ''];
  winStatus = false;
  isTie = false;
  //console.log(store);
  //console.log(currentPlayer, currentPlayerImage);
  // call API to start a new game
  gamesApi
    .newGames()
    .then(response => gamesUi.onNewGamesSuccess(response))
    .catch(() => gamesUi.onNewGamesFailure());
};
// function to update box and player image
const onUpdateGames = event => {
  let boxClicked = $(event.target).data('index');
  $('#error-status').html('');

  if (boxClicked === 'X' || boxClicked === 'O') {
    console.log('Not today bee');
  } else if (winStatus === true) {
    $('#error-status').html('<p>Click NEW GAME to start a new game.</p>');
  } else if (boxClicked === undefined) {
    boxClicked = $(event.target.parentElement).data('index');
    store.boxClicked = boxClicked;
    $('#error-status').html('<p>Choose a different square silly.</p>');
    console.log('undefined path');
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
    console.log(currentGameArray);
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
