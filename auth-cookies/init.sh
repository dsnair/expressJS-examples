#!/bin/bash

yarn init -y  # creates package.json
yarn add express knex pg bcrypt dotenv helmet faker
yarn add -D nodemon

touch index.js  # creates empty 'index.js'
touch .env
mkdir db db/migrations db/seeds
touch db/knex.js

read -p "Give a name for your new database: " dbName
createdb $dbName  # creates postgres DB
./node_modules/.bin/knex init  # creates 'knexfile.js'