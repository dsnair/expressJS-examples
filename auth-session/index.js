const express = require('express')
const knex = require('./db/knex')
const bcrypt = require('bcrypt')

const app = express()
app.use(express.json())
const port = process.env.PORT || 9090
app.listen(port, () => console.log('server is alive 🥁'))

// route handlers
const register = async (req, res) => {
  const user = req.body

  if (!user.username || !user.password)
    return res.status(400).send(`Username and password is required.`)

  try {
    // hash the original password, then hash the hash 2^10 times
    const hash = await bcrypt.hashSync(user.password, 10)
    await knex('users').insert({ ...user, password: hash })
    res.status(201).send(`Successfully created your account 🎉`)
  } catch (error) {
    console.error(error)
    error.code === '23505'
      ? res.status(500).json({
          error,
          msg: `Please enter a unique user name. ${
            user.username
          } already exists.`
        })
      : res
          .status(500)
          .json({ error, msg: `Something went wrong while creating new user.` })
  }
}

const login = async (req, res) => {
  if (!req.body.username || !req.body.password)
    return res.status(400).send(`Username and password is required.`)

  try {
    const user = await knex('users')
      .where('username', req.body.username)
      .first()

    if (!user)
      return res.status(400).send(`${req.body.username} doesn't exist.`)
    else {
      const isAuthenticated = await bcrypt.compareSync(
        req.body.password,
        user.password
      )
      isAuthenticated
        ? res.status(200).send(`Welcome back, ${user.username}!`)
        : res
            .status(401)
            .send(`Uh, oh! Either the username or password is incorrect.`)
    }
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({
        error,
        msg: `Something went wrong while logging-in ${req.body.username}.`
      })
  }
}

const getUsers = async (req, res) => {
  try {
    const users = await knex('users')
    res.status(200).json(users)
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ error, msg: 'Something went wrong while fetching users.' })
  }
}

// middleware

// routes
app.get('/', (rep, res) => res.send('server is alive 🥁'))
app.post('/register', register)
app.post('/login', login)
app.get('/users', getUsers)
