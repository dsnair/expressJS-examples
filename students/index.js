const express = require('express')
const cohortRoutes = require('./routes/cohortRoutes')
const studentRoutes = require('./routes/studentRoutes')

const app = express() // initialize Express
const port = process.env.PORT || 1000
app.listen(port, () => console.log(`Server is running 🏃`))

app.use(express.json())  // parser for incoming data

// routes
app.use('/', cohortRoutes)
app.use('/students', studentRoutes)
