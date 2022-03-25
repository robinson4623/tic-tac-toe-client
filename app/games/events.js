('use strict');

const gamesApi = require('./api.js');
const gamesUi = require('./ui.js');
const getFormFields = require('../../lib/get-form-fields.js');
const gamesApi = require('./api.js');

const onGetGames = function () {
  console.log('Getting Games');

  gamesApi
    .getGames()
    .then(response => gamesUi.onGetGamesSuccess(response))
    .catch(() => gamesUi.onGetGamesFailure());
};

module.exports = {
  onGetGames,
};
