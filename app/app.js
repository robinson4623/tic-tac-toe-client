('use strict');

const authEvents = require('./auth/events.js');
let pX = [];
let pO = [];

const assignValue = function () {
  const square = $(this).data();
  let indexValue = square.index;
  pX.push(indexValue);
  console.log(pX);

  //let squareIndex = square.index;
  //return squareIndex;
};

$(() => {
  $('#sign-up-form').on('submit', authEvents.onSignUp);
  $('#sign-in-form').on('submit', authEvents.onSignIn);
  $('#sign-out-button').on('click', authEvents.onSignOut);
  $('.box').on('click', assignValue);
  $('#get-games').on('click', authEvents.onGetGames);

  // $('.box').on('click', assignValue);
});
//console.log(assignValue);
