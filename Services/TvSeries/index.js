const express = require('express');
const { connect } = require('./config');
const app = express()
const port = process.env.PORT || 3002

connect((err) => {
    if (!err) {
        app.use(express.json())
        app.use(express.urlencoded({ extended: true }))
        app.use('/', require('./routes'))
        app.listen(port, () => {
            console.log('Listening in port : ', port)
        })
    } else {

    }
})



