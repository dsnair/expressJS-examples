const express = require('express')
const router = express.Router()
const axios = require('axios')

//route handler
const getUser = async (req, res) => {
  try {
    const users = await axios.get('https://jsonplaceholder.typicode.com/users')
    res.status(200).json(users.data)
  } catch (err) {
    console.error(err)
    res.status(500).json({
        error: err,
        msg: 'Failed to get users.'
    })
  }
}

// routes
router.get('/', getUser)

module.exports = router
