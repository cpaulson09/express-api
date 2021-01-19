const express = require('express')
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
require('dotenv').config()
const port = process.env.PORT || 3000

//set up DB
const { Client } = require('pg')
// const router = express.Router()
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
const connectionString = `postgres://${process.env.DBUSER}:${process.env.DBPASSWORD}@${process.env.DBHOST}:${process.env.DBPORT}/${process.env.DB}?sslmode=require`
const client = new Client({connectionString: connectionString})

//middle ware
app.use(bodyParser.json())
app.use(cors())

//get routes
// const routes = require('./routes')
// app.use('/api/addresses', routes)

app.get('/', (req, res) => {
    res.send("Welcome to Con's API")
})

// List Addresses
app.get('/list',   async (req, res) => {
    client.connect()
    client.query('SELECT * FROM addresses;', (err, result) => {
        if (err) {
            console.log(err)
            res.status(400).send(err)
        }
        res.status(200).send(result)
    })
})

// Create Record
app.post('/', (req, res) => {
    client.connect()
    const {firstName, lastName, address, city, state, zip} = req.body
    let query = 'INSERT INTO addresses (firstName, lastName, address, city, state, zip) values($1,$2,$3,$4,$5,$6)'
    let values = [firstName, lastName, address, city, state, zip]
    client.query(query, values, (err, result) => {
        if (err) {
            console.log(err)
            res.status(400).send({status: 'error', message: 'Error, please try again'})
        }
        console.log('success')
        res.status(200).send({status: 'success', message: 'Address successfully added. Thank you!'})
    })
})

// Delete Record
app.delete('/:id', (req, res) => {
    client.connect()
    const id = req.params.id
    let query = `DELETE FROM addresses WHERE id=${id}`
    client.query(query, (err, result) => {
        if (err) {
            console.log(err)
            res.status(400).send(err)
        }
        res.status(200).json({status: 'success', message: 'Address successfully removed'})
    })
})

app.listen(port, () => {console.log(`${port}`)})