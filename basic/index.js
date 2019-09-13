const express = require('express')

// setup server
const server = express()
server.use(express.json()) // for POST, parses req.body
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

const post = (req, res) => {
  const newPet = {
    id: db.length + 1,
    ...req.body
  }

  db.push(newPet)
  res.status(201).json(db)
}

// routes
server.get('/', get)
server.post('/', post)
