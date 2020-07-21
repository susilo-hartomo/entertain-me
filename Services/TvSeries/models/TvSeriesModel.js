const db = require('../config/index').getDB();
const TvSeries = db.collection('TvSeries')
const { ObjectId } = require('mongodb')
const { ValidationMoviesCollection } = require('../migrations/tvSeriesColections');

class TvSeriesModel {
    static findAll() {
        return TvSeries.find({}).toArray()
    }
    
    static findOne(id) {
        return TvSeries.findOne({"_id" : ObjectId(id)})
    }

    static createMovie(movies) {
        return TvSeries.insertOne(movies)
    }

    static deleteMovie(id) {
        return TvSeries.deleteOne({ "_id" : ObjectId(id)})
    }

    static editMovie(id, movies) {
        return TvSeries.updateOne({ "_id" : ObjectId(id)}, movies)
    }
}

module.exports = {
    TvSeriesModel
};



