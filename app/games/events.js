('use strict');

const gamesApi = require('./api.js');
const gamesUi = require('./ui.js');
const getFormFields = require('../../lib/get-form-fields.js');
const store = require('../store.js');
const app = require('../app.js');

const player1 = 'X';
const player2 = 'O';
const player1Image = '../../images/XBugs.png';
const player2Image = 'https://i.imgur.com/PIrG7Oh.png';

const playerWinImage = 'https://i.imgur.com/4rhFHxx.png';
let currentGameArray = ['', '', '', '', '', '', '', ''];

const board = currentGameArray;

let currentPlayer = player1;
store.currentPlayer = currentPlayer;

let currentPlayerImage = player1Image;
store.currentPlayerImage = currentPlayerImage;
let winner;

const setTie = function () {};

let winStatus = false;
const winConditionMet = function () {
  winner = currentPlayer;
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

const togglePlayerImage = function () {
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

const onNewGames = event => {
  gamesApi
    .newGames()
    .then(response => gamesUi.onNewGamesSuccess(response))
    .catch(() => gamesUi.onNewGamesFailure());
};

const onUpdateGames = event => {
  let boxClicked = $(event.target).data('index');

  if (boxClicked === undefined) {
    boxClicked = $(event.target.parentElement).data('index');
  }
  console.log(event);
  console.log('box', boxClicked);
  store.boxClicked = boxClicked;
  //console.log('storedgame', store, boxClicked);
  if (
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

    // gamesApi
    //   .updateGame(updateBoard)

    //   .then(response => gamesUi.onUpdateGamesSuccess(response))
    //   //.then(store.)
    //   .catch(() => gamesUi.onNewGamesFailure());
    // console.log(store.game);
    //checkWinStatus();
    //$(event.target).html(store.currentPlayer);

    //console.log(store.currentPlayer);

    togglePlayer();
    togglePlayerImage();
    //console.log(store.game);
  }
};

module.exports = {
  onNewGames,
  onUpdateGames,
};
