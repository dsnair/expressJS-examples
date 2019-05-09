// imports
require('dotenv').config()
const express = require('express')
const knex = require('./db/knex')
const helmet = require('helmet') // secures HTTP headers
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// variables
const port = process.env.PORT || 5050
const secret = process.env.SECRET

// config server
const app = express()

app.use(helmet())
app.use(express.json())

app.listen(port, () => console.log(`Let's go! 👁`))

// route handlers
const signup = async (req, res) => {
  if (!req.body.name || !req.body.password || !req.body.department)
    return res
      .status(400)
      .send(`The user's name, password and department are required.`)

  try {
    // hash the original password, then hash the hash 2^10 times
    const hash = await bcrypt.hashSync(req.body.password, 10)
    const user = { ...req.body, password: hash }
    const token = generateToken(user)
    await knex('users').insert(user)
    res.status(201).json({ msg: `Welcome, ${req.body.name}!`, token })
  } catch (error) {
    console.error(error)
    error.code === '23505'
      ? res.status(500).json({
          error,
          msg: `Please enter a unique name. ${req.body.name} already exists.`
        })
      : res.status(500).json({
          error,
          msg: `Something went wrong while signing-up ${req.body.name}.`
        })
  }
}

const login = async (req, res) => {
  if (!req.body.name || !req.body.password)
    return res.status(400).send(`The user's name and password are required.`)

  try {
    const user = await knex('users')
      .where('name', req.body.name)
      .first()

    if (user) {
      const isAuthenticated = await bcrypt.compareSync(
        req.body.password,
        user.password
      )
      if (isAuthenticated) {
        const token = generateToken(user)
        res.status(200).json({ msg: `Welcome back, ${user.name}!`, token })
      } else
        res
          .status(401)
          .send(`Uh, oh! Either the user's name or password is incorrect.`)
    } else {
      res.status(400).send(`${req.body.name} doesn't exist.`)
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({
      error,
      msg: `Something went wrong while logging-in ${req.body.name}.`
    })
  }
}

const users = async (req, res) => {
  try {
    const users = await knex('users')
    res.status(200).json(users)
  } catch (error) {
    console.error(error)
    res.status(500).json({
      error,
      msg: 'Something went wrong while fetching users.'
    })
  }
}

// middleware
const protectRoute = (req, res, next) => {
  const token = req.headers.token
  jwt.verify(token, secret, (error, decodedToken) => {
    if (error) {
      res.status(401).send('Unauthorized user. Please login first.')
    } else {
      console.log('decodedToken', decodedToken)
      req.decodedToken = decodedToken
      next()
    }
  })
}

const checkRole = role => {
  return (req, res, next) => {
    req.decodedToken &&
    req.decodedToken.role &&
    req.decodedToken.role.includes(role)
      ? next()
      : res
          .status(403)
          .send(
            `${req.decodedToken.role}s doesn't have access to this resource.`
          )
  }
}

// helpers
const generateToken = user => {
  // the data
  const payload = {
    subject: user.userId,
    name: user.name,
    role: user.role,
    department: user.department
  }

  const options = {
    expiresIn: '1d' // 1 day
  }

  return jwt.sign(payload, secret, options)
}

// routes
app.get('/', (rep, res) => res.send(`Let's go! 👁`))
app.post('/signup', signup)
app.post('/login', login)
app.get('/users', protectRoute, checkRole('Manager'), users)
