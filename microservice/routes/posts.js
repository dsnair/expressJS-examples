const express = require('express')
const router = express.Router()
const axios = require('axios')

// route handlers
const getPosts = async (req, res) => {
  try {
    const posts = await axios.get('https://jsonplaceholder.typicode.com/posts')
    res.status(200).json(posts.data)
  } catch (error) {
    console.error(error)
    res.status(500).json({
      error,
      msg: 'Failed to get posts.'
    })
  }
}

// routes
router.use('/', getPosts)

module.exports = router
