const express = require('express')
const usersRoute = require('./routes/users')
const photosRoute = require('./routes/photos')
const postsRoute = require('./routes/posts')

// setup server
const server = express()
server.listen(5000, () => console.log('Listening on 5000 ...'))

// route table
server.use('/users', usersRoute)
server.use('/photos', photosRoute)
server.use('/posts', postsRoute)