const { MongoClient } = require('mongodb');
// const { ValidationMoviesCollection } = require('../migrations/movieColections');

const url = "mongodb://localhost:27017"
const dbName = 'entertainMe'

var db;

const client = new MongoClient(url)

const connect = (cb) => {
    client.connect((err) => {
        if (err) {
            console.log('Vailed connect to mongo')
        } else {
            console.log('Succesfully connect to mongo')
            db = client.db(dbName)
            // ValidationMoviesCollection (db, (error) => {
            //     if (err) {
            //         console.log('error validation : ',error)
            //         cb(error)
            //     }
            // })
        }
        cb(err)
    })
}

const getDB = () => {
    return db
}

module.exports = {
    connect,
    getDB
};
