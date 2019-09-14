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

// router handlers
const get = (req, res) => res.status(200).json(db)

// middlewares
const upperCase = (req, res, next) => {
  for (obj of db) {
    obj.pet = obj.pet.toUpperCase()
  }
  next()
}

// routes
router.get('/', upperCase, get)

// export router
module.exports = router

/*
- upperCase() is a local middleware.
- next() is the middleware's callback that indicates that the current middleware has finished
and it should call the next middleware in the queue.
Don't forget next() or the request will hang and client will get timeout error.
- There can be 0+ middlewares.
*/
