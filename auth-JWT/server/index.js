// imports
const express = require('express')
const knex = require('./db/knex')

// variables
const port = process.env.PORT || 5050

// config server
const app = express()
app.listen(port, () => console.log(`Let's go! 🤹🏽`))
app.use(express.json())

// routes
app.get('/', (rep, res) => res.send(`Let's go! 🤹🏽‍`))