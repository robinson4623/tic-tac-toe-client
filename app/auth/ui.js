('use strict');

const store = require('../store.js');
const gameEvents = require('../games/events.js');

const resetHtmlImages = () => {
  $('#0').html('');
  $('#1').html('');
  $('#2').html('');
  $('#3').html('');
  $('#4').html('');
  $('#5').html('');
  $('#6').html('');
  $('#7').html('');
  $('#8').html('');
};

const onSignUpSuccess = function () {
  $('#auth-result').html('<p>All set</p>');
  $('#sign-up-form').css('display', 'none');
  $('#sign-up-head').html('<p>Signed up and ready to go!</p>');
  $('form').trigger('reset');
};

const onSignUpFailure = function () {
  $('#auth-result').html('<p>No bueno</p>');
};

const onSignInSuccess = function (response) {
  $('#error-status').html('');
  $('#sign-out-button').css('display', 'inline');
  $('#restart-button').css('display', 'inline');
  $('#sign-up-form').css('display', 'none');
  $('#sign-in-form').css('display', 'none');
  $('#sign-up-head').css('display', 'none');
  $('#sign-in-head').css('display', 'none');
  $('#new-game').css('display', 'inline');
  $('form').trigger('reset');
  store.user = response.user;
};

const onSignInFailure = function () {
  $('#error-status').html('<p>Error signing in, try again.</p>');
};

const onSignOutSuccess = function () {
  $('#error-status').html('<p>Signed out successfully.</p>');
  $('#new-game').css('display', 'none');
  $('#sign-up-form').css('display', 'inherit');
  $('#sign-in-form').css('display', 'inherit');
  $('#sign-up-head').css('display', 'inherit');
  $('#sign-in-head').css('display', 'inherit');
  $('.container-board .box').css('display', 'none');
  $('#winner-header').css('display', 'none');
  $('#restart-button').css('display', 'none');
  $('#sign-out-button').css('display', 'none');
  // gameEvents.currentPlayer = gameEvents.player1;
  // gameEvents.currentPlayerImage = gameEvents.player1Image;
  // gameEvents.currentPlayerWinImage = gameEvents.player1WinImage;
  //console.log(store)
  store.user = null;
  store.response = null;
  store.game = null
  gameEvents.isTrue = false
  console.log(store)

  //store.current
  //store.game.cells = ['', '', '', '', '', '', '', '', ''];

  resetHtmlImages();
};

const onSignOutFailure = function () {
  $('#auth-result').html('<p>Error signing out</p>');
};

module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  onSignOutSuccess,
  onSignOutFailure,
};
