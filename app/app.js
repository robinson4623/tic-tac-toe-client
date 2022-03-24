('use strict');

const authEvents = require('./auth/events.js');

$(() => {
  $('#sign-up-form').on('submit', authEvents.onSignUp);
});
