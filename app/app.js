('use strict');

const authEvents = require('./auth/events.js');
const gamesEvents = require('./games/events.js');
const store = require('./store.js');
const gamesApi = require('./games/api.js');
const gamesUi = require('./games/ui.js');

// switch active player function

// decided not to use
// const assignValue = function () {
//   const square = $(this).data();
//   let indexValue = square.index;
//   return indexValue;
// };

// const boxIndex = Array.from($('.box'));
// console.log(boxIndex);

// const newGameStart = function () {
//   $('.container-board .box').css('display', 'flex');
// };$(document).ready(function() {             $('#loginModal').modal('show');

$(() => {
  $('#sign-up-form').on('submit', authEvents.onSignUp);
  $('#sign-in-form').on('submit', authEvents.onSignIn);
  $('#sign-out-button').on('click', authEvents.onSignOut);
  $('.box').on('click', function (event) {
    gamesEvents.onUpdateGames(event);

    // let boxClicked = event.target.id;
    // store.boxClicked = boxClicked;

    // const updateBoard = {
    //   game: {
    //     cell: {
    //       index: boxClicked,
    //       value: currentPlayer,
    //     },
    //     over: false,
    //   },
    // };
    // //$('event.target').html('app.currentPlayer');
    // gamesApi
    //   .updateGame(updateBoard)
    //   .then(response => gamesUi.onUpdateGamesSuccess(response))
    //   .catch(() => gamesUi.onNewGamesFailure());

    //update the board with the current player's symbol
    //$(event.target).html(currentPlayer);

    //console.log(store);
  });
  $('#get-games').on('click', gamesEvents.onGetGames);
  $('#show-game').on('click', gamesEvents.onShowGames);
  $('#new-game').on('click', function () {
    // console.log('new game clicked');
    gamesEvents.onNewGames();
    $('.container-board .box').css('display', 'flex');
  });
});
