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
  },
  {
    id: 3,
    pet: 'fish'
  },
  {
    id: 4,
    pet: 'hamster'
  }
]

// route handlers
const get = (req, res) => {
  res.status(200).send(
    db
      .slice(0, req.query.limit) // pagination
      .sort((a, b) => {
        const sortby = req.query.sortby in a ? req.query.sortby : 'id'
        return a[sortby] > b[sortby] ? 1 : -1
      }) // sort
  )
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
