const express = require('express')

// setup router
const router = express.Router()

// database
let db = [
  {
    id: 1,
    pet: 'dog'
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

// routes
router.get('/', protectRoute, upperCase, get)

// export router
module.exports = router

/*
- local middlewares:
  - protectRoute(), upperCase()
  - There can be 0+ middlewares
  - Use cases:
    - protecting routes against unauthorized users
    - storing user data
    - data cleaning, etc.
- next()
  - is the middleware's callback that indicates that the current middleware has finished
  and it should call the next middleware in the queue.
  - Don't forget to call next() or the request will hang and client will get timeout error.
*/
