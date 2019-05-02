const express = require('express')
const knex = require('./db/knex')

const app = express() // initialize Express
const port = process.env.PORT || 1000
app.listen(port, () => console.log(`Server is running 🏃`))

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
app.get('/', getCohorts)
