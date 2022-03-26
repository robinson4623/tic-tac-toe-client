('use strict');

const authEvents = require('./auth/events.js');
const gamesEvents = require('./games/events.js');
const store = require('./store.js');
const gamesApi = require('./games/api.js');
const gamesUi = require('./games/ui.js');

const player1 = 'X';
const player2 = 'O';
const currentBoard = store.user;
let currentPlayer = player1;
const togglePlayer = function () {
  if (currentPlayer === player1) {
    currentPlayer = player2;
  } else currentPlayer = player1;
};

const assignValue = function () {
  const square = $(this).data();
  let indexValue = square.index;
  return indexValue;
};

const boxIndex = Array.from($('.box'));
//console.log(boxIndex);

const newGameStart = function () {
  $('.container-board .box').css('display', 'flex');
};

$(() => {
  $('#sign-up-form').on('submit', authEvents.onSignUp);
  $('#sign-in-form').on('submit', authEvents.onSignIn);
  $('#sign-out-button').on('click', authEvents.onSignOut);
  $('.box').on('click', function (event) {
    let boxClicked = event.target.id;
    const updateBoard = {
      game: {
        cell: {
          index: boxClicked,
          value: currentPlayer,
        },
        over: false,
      },
    };
    gamesApi
      .updateGame(updateBoard)
      .then(response => gamesUi.handleResponseSuccess(response))
      .catch(() => gamesUi.onNewGamesFailure());

    // gamesApi
    //   .newGames()
    //   .then(response => gamesUi.onNewGamesSuccess(response))
    //   .catch(() => gamesUi.onNewGamesFailure());

    // const currentGameState = store.game.cells;
    // currentGameState[boxClicked] = currentPlayer;
    // store.game.cells = currentGameState;
    //     {
    //   "game": {
    //     "cell": {
    //       "index": 0,
    //       "value": "x"
    //     },
    //     "over": false
    //   }
    // }

    togglePlayer();
    console.log(store); //store.gameIndex = boxClicked;
    //return boxClicked;
    //console.log(boxClicked);

    //     {
    //    "game":{
    //       "cells":[
    //          "",
    //          "",
    //          "",
    //          "",
    //          "",
    //          "",
    //          "",
    //          "",
    //          ""
    //       ],
    //       "over":false,
    //       "_id":"623e5a6d485fa20017835d6a",
    //       "owner":"623ca85c646429001718d946",
    //       "createdAt":"2022-03-26T00:12:29.431Z",
    //       "updatedAt":"2022-03-26T00:12:29.431Z",
    //       "__v":0
    //    }
    // }
  });

  $('#get-games').on('click', gamesEvents.onGetGames);
  $('#show-game').on('click', gamesEvents.onShowGames);
  $('#new-game').on('click', function () {
    gamesEvents.onNewGames();
    $('.container-board .box').css('display', 'flex');
  });
});

// const checkAndAssign = function () {
//   if
// }
//console.log(assignValue);
