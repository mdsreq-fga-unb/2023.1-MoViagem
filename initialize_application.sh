for dir in server client
do
  npm run start:dev -f ./client/package.json &
  npm run start -f ./server/package.json
done
