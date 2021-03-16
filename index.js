const express = require('express')
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
require('dotenv').config()
const port = process.env.PORT || 3000
const axios = require('axios')

//middle ware
app.use(bodyParser.json())
app.use(cors())

//get routes
const routes = require('./routes')
app.use('/api/addresses', routes)

app.get('/', (req, res) => {
    res.send("Welcome to Con's API")
})

app.get('/users', (req, res) => {
    // res.send('here')
    axios.get(`https://randomuser.me/api/?results=50`)
    .then(response => {
        if (response.data){
            res.status(200).send(response.data.results)
        }
    })
    .catch(err => {
        console.log(err)
    })
})

app.listen(port, () => {console.log(`${port}`)})