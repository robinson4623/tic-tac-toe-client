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

let currentPlayer = player1;
store.currentPlayer = currentPlayer;

let currentPlayerImage = player1Image;
store.currentPlayerImage = currentPlayerImage;

let winStatus = false;

const checkWinStatus = function () {
  if (
    currentGameArray[0] == currentPlayer &&
    currentGameArray[1] == currentPlayer &&
    currentGameArray[2] == currentPlayer
  ) {
    console.log('012 is the winner!');
  } else if (
    currentGameArray[3] === currentPlayer &&
    currentGameArray[4] === currentPlayer &&
    currentGameArray[5] === currentPlayer
  ) {
    console.log('345 is the winner!');
  } else if (
    currentGameArray[6] === currentPlayer &&
    currentGameArray[7] === currentPlayer &&
    currentGameArray[8] === currentPlayer
  ) {
    console.log('678 is the winner');
  } else if (
    currentGameArray[0] === currentPlayer &&
    currentGameArray[3] === currentPlayer &&
    currentGameArray[6] === currentPlayer
  ) {
    console.log('036 is the winner');
  } else if (
    currentGameArray[1] === currentPlayer &&
    currentGameArray[4] === currentPlayer &&
    currentGameArray[7] === currentPlayer
  ) {
    console.log('147 is the winner');
  } else if (
    currentGameArray[2] === currentPlayer &&
    currentGameArray[5] === currentPlayer &&
    currentGameArray[8] === currentPlayer
  ) {
    console.log('258 is the winner');
  } else if (
    currentGameArray[0] === currentPlayer &&
    currentGameArray[4] === currentPlayer &&
    currentGameArray[8] === currentPlayer
  ) {
    console.log('048 is the winner');
  } else if (
    currentGameArray[2] === currentPlayer &&
    currentGameArray[4] === currentPlayer &&
    currentGameArray[6] === currentPlayer
  ) {
    console.log('246 is the winner');
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
  store.boxClicked = boxClicked;

  if ($(event.target).text() !== '') {
    console.log('Choose a new square');
  } else {
    $(event.target).html(
      `<img src="${store.currentPlayerImage}" height="120px" width="120px">`
    );

    currentGameArray[boxClicked] = currentPlayer;
    console.log(currentGameArray);

    const updateBoard = {
      game: {
        cell: {
          index: boxClicked,
          value: currentPlayer,
        },
        over: winStatus,
      },
    };
    // const updateBoardWinner = {
    //   game: {
    //     cell: {
    //       index: boxClicked,
    //       value: currentPlayer,
    //     },
    //     over: true,
    //   },
    // };
    //console.log(currentGameArray);

    if ($(event.target).text() !== '') {
      console.log('Choose a new square');
    } else {
      $(event.target).html(
        `<img src="${store.currentPlayerImage}" height="120px" width="120px">`
      );
      checkWinStatus();

      gamesApi
        .updateGame(updateBoard)

        .then(response => gamesUi.onUpdateGamesSuccess(response))

        .catch(() => gamesUi.onNewGamesFailure());

      // gamesApi
      //   .updateGame(updateBoard)

      //   .then(response => gamesUi.onUpdateGamesSuccess(response))
      //   //.then(store.)
      //   .catch(() => gamesUi.onNewGamesFailure());
      console.log(store.game);
      //checkWinStatus();
      //$(event.target).html(store.currentPlayer);

      //console.log(store.currentPlayer);

      togglePlayer();
      togglePlayerImage();
      //console.log(store.game);
    }
  }
};

module.exports = {
  onNewGames,
  onUpdateGames,
};
