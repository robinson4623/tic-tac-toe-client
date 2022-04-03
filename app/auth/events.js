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
    .then(() => authUi.onSignUpSuccess())
    .catch(() => authUi.onSignUpFailure());
  //console.log(data);
};

const onSignIn = function (event) {
  event.preventDefault();
  //console.log('Sign in event');
  const form = event.target;
  const data = getFormFields(form);

  authApi
    .signIn(data)
    .then(response => authUi.onSignInSuccess(response))
    .catch(() => authUi.onSignInFailure());
};

const onSignOut = function () {
  console.log('Sign out event');
  //$('#0').html(<img src=""></img>);
  //`<img src="${store.currentPlayerImage}" height="120px" width="120px">`;
  authApi
    .signOut()
    .then(response => authUi.onSignOutSuccess(response))
    .catch(() => authUi.onSignInFailure());
};

module.exports = {
  onSignUp,
  onSignIn,
  onSignOut,
};
