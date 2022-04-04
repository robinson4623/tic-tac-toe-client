# VARIABLE=VALUE sh curl-scripts/auth/sign-up.sh

!/bin/bash

curl "https://tic-tac-toe-api-development.herokuapp.com/sign-in" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "'"${EMAIL}"'",
      "password": "'"${PASSWORD}"'"
      
    }
  }'

echo
