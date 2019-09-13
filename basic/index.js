const express = require('express')

// setup server
const server = express()
server.listen(5000, () => console.log('Listening on 5000 ...'))

// database
let db = [
  {
    id: 1,
    pet: 'dog'
  },
  {
    id: 2,
    pet: 'cat'
  }
]

// route handlers
const get = (req, res) => {
  res.status(200).send(db)
}

// routes
server.get('/', get)
