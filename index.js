const express = require('express')
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
require('dotenv').config()
const port = process.env.PORT || 3000

//middle ware
app.use(bodyParser.json())
app.use(cors())

//get routes
const routes = require('./routes')
app.use('/api/addresses', routes)

app.get('/', (req, res) => {
    res.send("Welcome to Con's API")
})

app.listen(port, () => {console.log(`${port}`)})