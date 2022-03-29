('use strict');

const store = require('../store.js');

// const getGames = function (data) {
//   return $.ajax({
//     method: 'GET',
//     url: 'https://tic-tac-toe-api-development.herokuapp.com/games',
//     headers: {
//       Authorization: 'Bearer ' + store.user.token,
//     },
//   });
// };

// const showGames = function (data) {
//   console.log(data);
//   return $.ajax({
//     method: 'GET',
//     url: 'https://tic-tac-toe-api-development.herokuapp.com/games/' + data.id,
//     headers: {
//       Authorization: 'Bearer ' + store.user.token,
//     },
//   });
// };

const newGames = function () {
  return $.ajax({
    method: 'POST',
    url: 'https://tic-tac-toe-api-development.herokuapp.com/games',
    headers: {
      Authorization: 'Bearer ' + store.user.token,
    },
    data: '{}',
  });
};

const updateGame = function (updateData) {
  return $.ajax({
    method: 'PATCH',
    url:
      'https://tic-tac-toe-api-development.herokuapp.com/games/' +
      store.game._id,
    headers: {
      Authorization: 'Bearer ' + store.user.token,
    },
    data: updateData,
  });
};

module.exports = {
  newGames,

  updateGame,
};
