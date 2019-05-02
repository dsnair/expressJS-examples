#!/bin/bash

createdb lambda
./node_modules/.bin/knex migrate:latest
./node_modules/.bin/knex seed:run