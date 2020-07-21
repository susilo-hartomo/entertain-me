const { TvSeriesModel } = require('../models/TvSeriesModel');

class TvSeriesCont {
    static async findAll(req, res) {
        try {
            const movies = await TvSeriesModel.findAll()
            res.status(200).json(movies)
        } catch (error) {
            console.log(error)
        }
    }

    static async create(req, res) {
        console.log('req: ', req.body);
        try {
            const createMovie = await TvSeriesModel.createMovie(req.body)
            res.status(200).json(createMovie.ops)
        } catch (error) {
            res.status(500).json(error)
            console.log(error)
        }
    }

    static async findOne(req, res) {
        console.log('req: ', req.params.id);
        try {
            const findMovie = await TvSeriesModel.findOne(req.params.id)
            res.status(200).json(findMovie)
        } catch (error) {
            res.status(500).json(error)
            console.log(error)
        }
    }
    static async delete(req, res) {
        console.log('req: ', req.params.id);
        try {
            const deleteMovie = await TvSeriesModel.deleteMovie(req.params.id)
            res.status(200).json(deleteMovie.result)
        } catch (error) {
            res.status(500).json(error)
            console.log(error)
        }
    }

    static async edit(req, res) {
        console.log('req: ', req.params.id);
        try {
            const editMovie = await TvSeriesModel.editMovie(req.params.id, req.body)
            res.status(200).json(editMovie)
        } catch (error) {
            res.status(500).json(error)
            console.log(error)
        }
    }
}

module.exports = { TvSeriesCont };