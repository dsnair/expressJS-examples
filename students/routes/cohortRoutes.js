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

const getStudentsByCohort = async (req, res) => {
  const id = req.params.cohortId
  try {
    const students = await knex('cohorts')
      .join('students', 'cohorts.cohortId', 'students.cohortId')
      .where('cohorts.cohortId', id)
      .select()
    if (!students.length)
      return res.status(404).send(`cohort ID ${id} doesn't exist`)
    else res.status(200).json(students)
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ error, msg: `Error getting students by cohort ID ${id}` })
  }
}

const deleteCohort = async (req, res) => {
  const id = req.params.cohortId
  try {
    const isDeleted = await knex('cohorts')
      .where('cohortId', id)
      .del()
    if (!isDeleted) return res.status(404).send(`cohort ID ${id} doesn't exist`)
    else {
      const cohorts = await knex.select().from('cohorts')
      res.status(200).json(cohorts)
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error, msg: `Error deleting cohort ID ${id}` })
  }
}

// routes
router.get('/', getCohorts)
router.get('/:cohortId/students', getStudentsByCohort)
router.delete('/:cohortId', deleteCohort)

module.exports = router
