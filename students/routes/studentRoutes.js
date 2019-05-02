const express = require('express')
const knex = require('../db/knex')

const router = express.Router()

// route handlers
const getStudents = async (req, res) => {
  try {
    const students = await knex.select().from('students')
    return res.status(200).json(students)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error, msg: 'Error getting students' })
  }
}

// routes
router.get('/', getStudents)

module.exports = router
