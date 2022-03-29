('use strict');

const store = require('../store.js');

const onSignUpSuccess = function () {
  $('#auth-result').html('<p>All set</p>');
  $('form').trigger('reset');
};

const onSignUpFailure = function () {
  $('#auth-result').html('<p>No bueno</p>');
};

const onSignInSuccess = function (response) {
  $('#auth-result').html('<p>Signed in and ready</p>');
  $('form').trigger('reset');
  $('#new-game').css('display', 'flex');
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
