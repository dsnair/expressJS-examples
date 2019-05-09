// imports
require('dotenv').config()
const express = require('express')
const knex = require('./db/knex')
const helmet = require('helmet') // secures HTTP headers

// variables
const port = process.env.PORT || 5050
const secret = process.env.SECRET

// config server
const app = express()

app.use(helmet())
app.use(express.json())

app.listen(port, () => console.log(`Let's go! 🤹🏽`))

// routes
app.get('/', (rep, res) => res.send(`Let's go! 🤹🏽‍`))
