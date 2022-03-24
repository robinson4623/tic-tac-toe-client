('use strict');

const authApi = require('./api.js');
const authUi = require('./ui.js');
const getFormFields = require('../../lib/get-form-fields.js');

const onSignUp = function (event) {
  event.preventDefault();
  console.log('Sign up event');
  const form = event.target;
  const data = getFormFields(form);
  authApi
    .signUp(data)
    .then(
      () => authUi.onSignUpSuccess(),
      console.log('it works til this point')
    )
    .catch(() => authUi.onSignUpFailure());
  //console.log(data);
};

module.exports = {
  onSignUp,
};
