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
  store.user = response.user;
};

const onSignInFailure = function () {
  $('#auth-result').html('<p>Didnt get signed in</p>');
};

const onSignOutSuccess = function (response) {
  $('#auth-result').html('<p>Signed out sucka</p>');
};

const onSignOutFailure = function () {
  $('#auth-result').html('<p>Error signing out</p>');
};

const onGetGamesSuccess = function (response) {
  $('#auth-result').html('<p>It did work</p>');
  console.log(response);
  //$('form').trigger('reset');
  store.user = response.user;
};

const onGetGamesFailure = function () {
  $('#auth-result').html('<p>not working for some reason</p>');
};

module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  onSignOutSuccess,
  onSignOutFailure,
  onGetGamesSuccess,
  onGetGamesFailure,
};
