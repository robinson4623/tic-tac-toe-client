('use strict');

const store = require('../store.js');
const app = require('../app.js');

const handleResponseSuccess = function (response) {
  store.game = response.game;
};

// const onGetGamesSuccess = function (response) {
//   $('#auth-result').html('<p>It did work</p>');
//   //console.log(response);
//   //$('form').trigger('reset');
//   store.user = response.user;
// };

// const onGetGamesFailure = function () {
//   $('#auth-result').html('<p>not working for some reason</p>');
// };

// const onShowGamesSuccess = function (response) {
//   $('#auth-result').html('<p>Showing Game Now</p>');
//   //console.log(response);
//   //$('form').trigger('reset');
// };

// const onShowGamesFailure = function () {
//   $('#auth-result').html('<p>not gonna show a game</p>');
// };

const onNewGamesSuccess = function (response) {
  $('#auth-result').html('<p>New Game Now</p>');
  handleResponseSuccess(response);
};

const onNewGamesFailure = function () {
  $('#auth-result').html('<p>not gonna play a new game</p>');
};

const onUpdateGamesSuccess = function (response) {
  //console.log('store', store);

  $('#auth-result').html('<p>Game updated</p>');
  //$('${#id + [indexValue]}').html(app.currentPlayer);
  handleResponseSuccess(response);
  //console.log('response', response);
};

const onUpdateGamesFailure = function () {
  $('#auth-result').html('<p>error updating game</p>');
};

module.exports = {
  onNewGamesSuccess,
  onNewGamesFailure,
  handleResponseSuccess,
  onUpdateGamesSuccess,
  onUpdateGamesFailure,
};
