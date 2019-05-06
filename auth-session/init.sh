#!/bin/bash

yarn init -y
yarn add express knex pg
yarn add -D nodemon
touch index.js
createdb project