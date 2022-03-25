('use strict');

const store = require('../store.js');

const getGames = function (data) {
  return $.ajax({
    method: 'GET',
    url: 'https://tic-tac-toe-api-development.herokuapp.com/games',
    headers: {
      Authorization: 'Bearer ' + store.user.token,
    },
  });
};

module.exports = {
  getGames,
};
