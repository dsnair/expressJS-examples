const express = require('express');
const knex = require('./db/knex')

const app = express();
const port = process.env.PORT || 3300
app.listen(port, () => console.log(`Server listening on ${port} 🔥`))

app.use(express.json());

// route handlers
const getName = (req, res) => res.status(200).send('GET works!')

// routes
app.get('/', getName)
