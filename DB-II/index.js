const express = require('express')
const knex = require('./db/knex')

const app = express()
const port = process.env.PORT || 3300
app.listen(port, () => console.log(`Server listening on ${port} 🔥`))

app.use(express.json())

// route handlers
const postZoo = async (req, res) => {
  if (!req.body.name) {
    return res.status(400).send('Zoo name must be provided')
  }

  try {
    await knex('zoos').insert(req.body)
    const zoos = await knex.select().from('zoos')
    res.status(201).json(zoos)
  } catch (error) {
    error.code === '23505'
      ? res.status(500).json({
          error,
          msg: `Please enter a unique name. ${req.body.name} already exists.`
        })
      : res.status(500).json({ error, msg: 'Error creating new zoo' })
  }
}

const getZoo = async (req, res) => {
  try {
    const zoos = await knex.select().from('zoos')
    return res.status(200).json(zoos)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error, msg: 'Error getting zoos' })
  }
}
// routes
app.post('/', postZoo)
app.get('/', getZoo)
