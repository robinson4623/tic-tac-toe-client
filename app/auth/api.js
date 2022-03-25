('use strict');

const store = require('../store.js');

const signUp = function (data) {
  return $.ajax({
    method: 'POST',
    url: 'https://tic-tac-toe-api-development.herokuapp.com/sign-up',
    data,
  });
};

const signIn = function (data) {
  return $.ajax({
    method: 'POST',
    url: 'https://tic-tac-toe-api-development.herokuapp.com/sign-in',
    data,
  });
};

const signOut = function (data) {
  return $.ajax({
    method: 'DELETE',
    url: 'https://tic-tac-toe-api-development.herokuapp.com/sign-out',
    headers: {
      Authorization: 'Bearer ' + store.user.token,
    },
  });
};

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
  signUp,
  signIn,
  signOut,
  getGames,
};
