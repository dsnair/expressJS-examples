const express = require('express')
const petsRoute = require('./router.js')

// setup server
const server = express()
server.listen(5000, () => console.log('Listening on 5000 ...'))

// mount middleware at the specified route
server.use('/pets', petsRoute)
server.use((req, res) => res.status(404).send("This page doesn't exist."))

/*
- Lines 9 & 10 are global app middlewares. Their order matters. 
If line 9 & 10 are swapped, /pets breaks & responds with 404.
- Line 10 responds with 404 for all invalid routes, expect /pets. Example: '/'
*/