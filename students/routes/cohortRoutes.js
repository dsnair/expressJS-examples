const express = require('express')
const knex = require('../db/knex')

const router = express.Router()

// route handlers
const getCohorts = async (req, res) => {
  try {
    const cohorts = await knex.select().from('cohorts')
    return res.status(200).json(cohorts)
  } catch (error) {
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
      return res
        .status(200)
        .json({ msg: `There are no students with cohort ID ${id}` })
    else res.status(200).json(students)
  } catch (error) {
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
    res.status(500).json({ error, msg: `Error deleting cohort ID ${id}` })
  }
}

const putCohort = async (req, res) => {
  const id = req.params.cohortId
  const newCohort = req.body

  if (!newCohort.name) {
    return res.status(400).send(`Cohort name must be provided`)
  }

  try {
    const isUpdated = await knex('cohorts')
      .where('cohortId', id)
      .update(newCohort)
    if (!isUpdated) return res.status(404).send(`cohort ID ${id} doesn't exist`)
    else {
      const cohorts = await knex.select().from('cohorts')
      res.status(200).json(cohorts)
    }
  } catch (error) {
    error.code === '23505'
      ? res.status(500).json({
          error,
          msg: `Please enter a unique cohort name. ${
            newCohort.name
          } already exists.`
        })
      : res.status(500).json({ error, msg: `Error updating cohort ID ${id}` })
  }
}

const postCohort = async (req, res) => {
  const newCohort = req.body

  if (!newCohort.name)
    return res.status(400).send(`Cohort name must be provided`)

  try {
    await knex('cohorts').insert(newCohort)
    const cohorts = await knex.select().from('cohorts')
    res.status(201).json(cohorts)
  } catch (error) {
    error.code === '23505'
      ? res.status(500).json({
          error,
          msg: `Please enter a unique cohort name. ${
            newCohort.name
          } already exists.`
        })
      : res.status(500).json({ error, msg: 'Error creating new cohort' })
  }
}

// routes
router.get('/', getCohorts)
router.get('/:cohortId/students', getStudentsByCohort)
router.delete('/:cohortId', deleteCohort)
router.put('/:cohortId', putCohort)
router.post('/', postCohort)

module.exports = router
