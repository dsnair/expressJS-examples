const express = require('express')
const knex = require('./db/knex')

const app = express()
const port = process.env.PORT || 2000
app.listen(port, () => console.log(`Server is up ⬆`))

app.use(express.json())

// route handlers
const postProject = async (req, res) => {
  const newProject = req.body

  if (!newProject.name)
    return res.status(400).send('A new project must have a name.')
  try {
    await knex('projects').insert(newProject)
    const projects = await knex.select().from('projects')
    res.status(201).json(projects)
  } catch (error) {
    console.error(error)
    error.code === '23505'
      ? res.status(500).json({
          error,
          msg: `Project name must be unique. ${newProject.name} already exists.`
        })
      : res.status(500).json({ error, msg: 'Error creating new project' })
  }
}

// routes

app.post('/projects', postProject)
// app.post('/actions', postAction)
// app.get('/projects/:projectId', getAllById)
app.get('/', (req, res) => res.send(`API is up ⬆`))
