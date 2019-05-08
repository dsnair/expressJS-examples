// imports
const express = require('express')
const knex = require('./db/knex')
const bcrypt = require('bcrypt')
const session = require('express-session')

// variables
// const secret = process.env.COOKIE_SECRET
const secret = 'some password to encrypt cookie session'
const port = process.env.PORT || 9090

// config server
const app = express()
app.listen(port, () => console.log('server is alive 🥁'))

app.use(express.json()) // parse incoming request data

app.use(
  session({
    name: 'cookie',
    secret,
    saveUninitialized: false, // don't create new session automatically, important to comply with law
    resave: false, // don't save session if it didn't change
    cookie: {
      // 60 secs = 1 min, 60 mins = 1 hour, 24 hours = 1 day; multiplied by 1000 for millisecs
      maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day (in millisecs), how long should session stay alive
      httpOnly: true, // prevent JS code from accessing cookies
      // set true in production, false in development
      secure: process.env.NODE_ENV === 'production' // only send cookie over HTTPS, not HTTP
    }
  })
)

// route handlers
const signup = async (req, res) => {
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
      : res.status(500).json({
          error,
          msg: `Something went wrong while signing-up new user.`
        })
  }
}

const login = async (req, res) => {
  if (!req.body.username || !req.body.password)
    return res.status(400).send(`Username and password is required.`)

  try {
    const user = await knex('users')
      .where('username', req.body.username)
      .first()

    if (user) {
      const isAuthenticated = await bcrypt.compareSync(
        req.body.password,
        user.password
      )
      if (isAuthenticated) {
        req.session.username = user.username // this cookie is sent by express-session library
        res.status(200).send(`Welcome back, ${user.username}!`)
      } else
        res
          .status(401)
          .send(`Uh, oh! Either the username or password is incorrect.`)
    } else {
      res.status(400).send(`${req.body.username} doesn't exist.`)
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({
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
const protectRoute = async (req, res, next) => {
  const { username, password } = req.headers

  if (!username || !password)
    return res.status(400).send(`Unauthorized user. Please login first.`)

  try {
    const user = await knex('users')
      .where('username', username)
      .first()

    if (!user) return res.status(400).send(`${username} doesn't exist.`)
    else {
      const isAuthenticated = await bcrypt.compareSync(password, user.password)
      isAuthenticated
        ? next()
        : res
            .status(401)
            .send(`Uh, oh! Either the username or password is incorrect.`)
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({
      error,
      msg: `Something went wrong while logging-in ${username}.`
    })
  }
}

// routes
app.get('/', (rep, res) => res.send('server is alive 🥁'))
app.post('/signup', signup)
app.post('/login', login)
app.get('/users', protectRoute, getUsers)
