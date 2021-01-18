const express = require('express')
const { Client } = require('pg')
const router = express.Router()
require('dotenv').config()
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
const connectionString = `postgres://${process.env.DBUSER}:${process.env.DBPASSWORD}@${process.env.DBHOST}:${process.env.DBPORT}/${process.env.DB}?sslmode=require`
const client = new Client({connectionString: connectionString})

// List Addresses
router.get('/',   async (req, res) => {
    client.connect()
    client.query('SELECT * FROM addresses;', (err, result) => {
        if (err) {
            console.log(err)
            res.status(400).send(err)
        }
        res.status(200).send(result.rows)
    })
})

// Create Record
router.post('/', (req, res) => {
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
router.delete('/:id', (req, res) => {
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


module.exports = router