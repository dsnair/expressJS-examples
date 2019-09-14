const express = require('express')
const petsRoute = require('./router.js')

// setup server
const server = express()
server.listen(5000, () => console.log('Listening on 5000 ...'))

// mount middleware at the specified route
server.use('/', (req, res) => res.status(200).send('Welcome to Petland!'))
server.use('/pets', petsRoute)