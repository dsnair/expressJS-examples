#!/bin/bash

yarn init -y  # creates package.json
yarn add express knex pg faker
yarn add -D nodemon

touch index.js  # creates empty 'index.js'
mkdir db db/migrations db/seeds
touch db/knex.js

createdb project  # creates postgres DB named 'project'
./node_modules/.bin/knex init  # creates 'knexfile.js'
./node_modules/.bin/knex migrate:make project  # creates '/db/migrations/[timestamp]_project.js'
