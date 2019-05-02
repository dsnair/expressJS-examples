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

const getZooById = async (req, res) => {
  const id = req.params.id
  try {
    const zoo = await knex('zoos')
      .where({ id })
      .select()
    if (!zoo.length) {
      return res.status(400).send(`Zoo ID ${id} doesn't exist`)
    } else {
      res.status(200).json(zoo)
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error, msg: 'Error getting zoos' })
  }
}

const deleteZoo = async (req, res) => {
  const id = req.params.id
  try {
    const isDeleted = await knex('zoos')
      .where({ id })
      .del()
    if (!isDeleted) {
      return res
        .status(404)
        .send(`Couldn't delete zoo ID ${id} because it doesn't exist`)
    } else {
      const zoos = await knex.select().from('zoos')
      res.status(200).json(zoos)
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error, msg: `Error deleting zoo ID ${id}` })
  }
}

const putZoo = async (req, res) => {
  const id = req.params.id
  const newZoo = req.body

  if (!newZoo.name) {
    return res.status(400).send(`Zoo name must be provided`)
  }

  try {
    const isUpdated = await knex('zoos')
      .where({ id })
      .update(newZoo)
    if (!isUpdated) {
      return res
        .status(404)
        .send(`Couldn't update zoo ID ${id} because it doesn't exist`)
    } else {
      const zoos = await knex.select().from('zoos')
      res.status(200).json(zoos)
    }
  } catch (error) {
    error.code === '23505'
      ? res.status(500).json({
          error,
          msg: `Please enter a unique name. ${newZoo.name} already exists.`
        })
      : res.status(500).json({ error, msg: `Error updating zoo ID ${id}` })
  }
}

// routes
app.post('/', postZoo)
app.get('/', getZoo)
app.get('/:id', getZooById)
app.delete('/:id', deleteZoo)
app.put('/:id', putZoo)
