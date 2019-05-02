const express = require('express')
const knex = require('../db/knex')

const router = express.Router()

// route handlers
const getCohorts = async (req, res) => {
  try {
    const cohorts = await knex.select().from('cohorts')
    return res.status(200).json(cohorts)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error, msg: 'Error getting cohorts' })
  }
}

// routes
router.get('/', getCohorts)

module.exports = router
