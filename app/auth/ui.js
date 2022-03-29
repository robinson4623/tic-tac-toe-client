('use strict');

const store = require('../store.js');

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
  $('#auth-result').html('<p>Signed in and ready</p>');
  $('#sign-up-form').css('display', 'none');
  $('#sign-in-form').css('display', 'none');
  $('#sign-up-head').css('display', 'none');
  $('#sign-in-head').css('display', 'none');
  $('#new-game').css('display', 'flex');
  $('form').trigger('reset');
  store.user = response.user;
};

const onSignInFailure = function () {
  $('#auth-result').html('<p>Didnt get signed in</p>');
};

const onSignOutSuccess = function (response) {
  $('#auth-result').html('<p>Signed out sucka</p>');
  store.user = null;
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
