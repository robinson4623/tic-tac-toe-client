curl "https://tic-tac-toe-api-development.herokuapp.com" \
  --include \
  --request DELETE \
  --header "Authorization: Bearer ${TOKEN}" \

echo
