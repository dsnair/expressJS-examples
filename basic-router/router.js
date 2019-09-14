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

// routes
router.get('/', get)

// export router
module.exports = router
