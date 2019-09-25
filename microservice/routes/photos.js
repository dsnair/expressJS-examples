const express = require('express')
const router = express.Router()
const axios = require('axios')

// route handlers
const getPhotos = async (req, res) => {
  try {
    const photos = await axios.get(
      'https://jsonplaceholder.typicode.com/photos'
    )
    res.status(200).json(photos.data)
  } catch (err) {
    console.error(err)
    res.status(500).json({
      error: err,
      msg: 'Failed to get photos.'
    })
  }
  res.status(200).send('GET photos')
}

// routes
router.get('/', getPhotos)

module.exports = router
