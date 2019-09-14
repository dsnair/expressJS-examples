const express = require('express')

// setup server
const server = express()
server.listen(5000, () => console.log('Listening on 5000 ...'))

// database
let db = [
  {
    id: 1,
    pet: 'chinchilla'
  },
  {
    id: 2,
    pet: 'bird'
  },
  {
    id: 3,
    pet: 'fish'
  },
  {
    id: 4,
    pet: 'hamster'
  },
  {
    id: 5,
    pet: 'lizard'
  }
]

// middlewares
const protectRoute = (req, res, next) => {
  req.headers.name ? next() : res.status(401).send('Please login!')
}

const upperCase = (req, res, next) => {
  for (obj of db) {
    obj.pet = obj.pet.toUpperCase()
  }
  next()
}

// router handlers
const get = (req, res) => res.status(200).json(db)

// mount middleware at specified route
server.get('/', protectRoute, upperCase, get)
server.use((req, res) => res.status(404).send("This page doesn't exist."))

/*
- Lines 47 & 48 are global app middlewares. Their order matters. 
If line 47 & 48 are swapped, '/' breaks & responds with 404.
- Line 48 responds with 404 for all invalid routes, expect '/'. Example: '/pets'
*/