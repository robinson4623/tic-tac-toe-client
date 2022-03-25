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

module.exports = {
  onGetGamesSuccess,
  onGetGamesFailure,
};
