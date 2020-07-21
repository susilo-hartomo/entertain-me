const db = require('../config/index').getDB();
const Movies = db.collection('Movies')
const { ObjectId } = require('mongodb')
const { ValidationMoviesCollection } = require('../migrations/movieColections');

ValidationMoviesCollection(db, (error) => {
    if (error) {
        console.log('error validation : ', error)
        cb(error)
    }
})

class MoviesModel {
    static findAll() {
        return Movies.find({}).toArray()
    }

    static findOne(id) {
        return Movies.findOne({ "_id": ObjectId(id) })
    }

    static createMovie(movies) {
        return Movies.insertOne(movies)
    }

    static deleteMovie(id) {
        return Movies.deleteOne({ "_id": ObjectId(id) })
    }

    static editMovie(id, movie) {
        return Movies.updateOne({ "_id": Object(id) }, movie)
    }
}

module.exports = {
    MoviesModel
};



