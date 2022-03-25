('use strict');

const store = require('../store.js');

const onGetGamesSuccess = function (response) {
  $('#auth-result').html('<p>It did work</p>');
  console.log(response);
  //$('form').trigger('reset');
  store.user = response.user;
};

const onGetGamesFailure = function () {
  $('#auth-result').html('<p>not working for some reason</p>');
};

const onShowGamesSuccess = function (response) {
  $('#auth-result').html('<p>Showing Game Now</p>');
  console.log(response);
  //$('form').trigger('reset');
  store.user = response.user;
};

const onShowGamesFailure = function () {
  $('#auth-result').html('<p>not gonna show a game</p>');
};

const onNewGamesSuccess = function (response) {
  $('#auth-result').html('<p>New Game Now</p>');
  const newGameArray = response;
  store.owner = response.owner;
  store.user = response.user;
  store._id = response._id;

  console.log(newGameArray);
  return newGameArray;
};

const onNewGamesFailure = function () {
  $('#auth-result').html('<p>not gonna play a new game</p>');
};

module.exports = {
  onGetGamesSuccess,
  onGetGamesFailure,
  onShowGamesSuccess,
  onShowGamesFailure,
  onNewGamesSuccess,
  onNewGamesFailure,
};
