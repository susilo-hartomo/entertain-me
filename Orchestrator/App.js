const express = require('express');
const app = express()
const axios = require('axios');
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/movies', (req, res) => {
    const { response } = require('../Services/Movies/index')
    axios({
        url: 'http://localhost:3001/movies',
        method: 'GET',
    })
    .then((result) => {
        res.status(200).json(result.data)
    }).catch((err) => {
        res.status(500).json(err)
    });
})

app.get('/tvseries', (req, res) => {
    const { response } = require('../Services/TvSeries/index')
    axios({
        url: 'http://localhost:3002/TvSeries',
        method: 'GET',
    })
    .then((result) => {
        res.status(200).json(result.data)
    }).catch((err) => {
        res.status(500).json(err)
    });
})

app.listen(port, () => {
    console.log('Orchestrator running at : ', port)
})