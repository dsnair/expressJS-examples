const express = require('express')
const knex = require('./db/knex')

const app = express() // initialize Express
const port = process.env.PORT || 1000
app.listen(port, () => console.log(`Server is running 🏃`))

// route handlers
const getCohorts = (req, res) => res.status(200).send('GET works!')

// routes
app.get('/', getCohorts)
