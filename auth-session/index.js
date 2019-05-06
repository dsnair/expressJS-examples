const express = require('express')

const app = express()
const port = process.env.PORT || 9090
app.listen(port, () => console.log('server is alive 🥁'))

app.get('/', (rep, res) => res.send('server is alive 🥁'))
