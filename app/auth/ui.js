('use strict');

const store = require('../store.js');

const onSignUpSuccess = function () {
  $('#auth-result').html('<p>All set</p>');
  $('form').trigger('reset');
};

const onSignUpFailure = function () {
  $('#auth-result').html('<p>No bueno</p>');
};

module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
};
