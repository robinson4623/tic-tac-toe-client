('use strict');

const store = require('../store.js');
const app = require('../app.js');

const handleResponseSuccess = function (response) {
  store.game = response.game;
};

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
