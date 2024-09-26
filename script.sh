echo "hello world"
./wait-for.sh db:27017 -- /home/node/app/node_modules/.bin/nodemon index.js
