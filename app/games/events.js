('use strict');

const gamesApi = require('./api.js');
const gamesUi = require('./ui.js');
const getFormFields = require('../../lib/get-form-fields.js');

const onGetGames = function () {
  console.log('Getting Games');

  gamesApi
    .getGames()
    .then(response => gamesUi.onGetGamesSuccess(response))
    .catch(() => gamesUi.onGetGamesFailure());
};

const onShowGames = event => {
  event.preventDefault();
  const form = event.target;
  const data = getFormFields();
  console.log(data);

  gamesApi
    .showGames(data)
    .then(response => gamesUi.onShowGamesSuccess(response))
    .catch(() => gamesUi.onShowGamesFailure());
};

const onNewGames = function (event) {
  //event.preventDefault();
  console.log('Making New Game');

  //const box = event.target;
  //console.log(box);
  gamesApi
    .newGames()
    .then(response => gamesUi.onNewGamesSuccess(response))
    .catch(() => gamesUi.onNewGamesFailure());
};

module.exports = {
  onGetGames,
  onShowGames,
  onNewGames,
};
