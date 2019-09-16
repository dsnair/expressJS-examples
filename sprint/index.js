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
    return res.status(400).send('A project must have a name.')
  try {
    await knex('projects').insert(newProject)
    const projects = await knex('projects')
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

const postAction = async (req, res) => {
  const newAction = req.body

  if (!newAction.description)
    return res.status(400).send('An action must have a description.')
  try {
    await knex('actions').insert({
      ...newAction,
      projectId: req.params.projectId
    })
    const actions = await knex('actions')
    res.status(201).json(actions)
  } catch (error) {
    console.error(error)
    error.code === '23505'
      ? res.status(500).json({
          error,
          msg: `Action description must be unique. ${
            newAction.description
          } already exists.`
        })
      : res.status(500).json({ error, msg: 'Error creating new action' })
  }
}

const getById = async (req, res) => {
  const projectId = req.params.projectId
  try {
    const project = await knex('projects')
      .where('projectId', projectId)
      .first()

    if (!project)
      return res.status(404).send(`Project ID ${projectId} doesn't exist`)

    const action = await knex('actions')
      .join('projects', 'actions.projectId', 'projects.projectId')
      .where('actions.projectId', projectId)
    res.status(200).json({ ...project, action })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      error,
      msg: `Error fetching project ID ${projectId} and its actions`
    })
  }
}

// routes
app.post('/projects', postProject)
app.post('/projects/:projectId/actions', postAction)
app.get('/projects/:projectId', getById)
app.get('/', (req, res) => res.send(`API is up ⬆`))
