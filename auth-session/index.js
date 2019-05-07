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
    return res.status(400).send(`Username and password is required`)

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
          .json({ error, msg: `Something went wrong while creating new user` })
  }
}

// middleware

// routes
app.get('/', (rep, res) => res.send('server is alive 🥁'))
app.post('/register', register)
