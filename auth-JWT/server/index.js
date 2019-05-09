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
const login = async (req, res) => {
  if (!req.body.name || !req.body.password)
    return res.status(400).send(`The user's name and password is required.`)

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

// middleware

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
app.post('/login', login)
