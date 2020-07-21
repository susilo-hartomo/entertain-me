const { MoviesModel } = require('../models/moviesModel');


class MoviesCont {
    static async findAll(req, res) {
        try {
            const movies = await MoviesModel.findAll()
            res.status(200).json(movies)
        } catch (error) {
            console.log(error)
        }
    }
    
    static async create(req, res) {
        // console.log('req body add movie: ', req.body);
        try {
            const createMovie = await MoviesModel.createMovie(req.body)
            // console.log('createMovie: ', createMovie);
            res.status(200).json(createMovie.ops)
        } catch (error) {
            res.status(500).json(error)
            console.log(error)
        }
    }
    
    static async findOne(req, res) {
        console.log('req: ', req.params.id);
        try {
            const findMovie = await MoviesModel.findOne(req.params.id)
            res.status(200).json(findMovie)
        } catch (error) {
            res.status(500).json(error)
            console.log(error)
        }
    }
    static async delete(req, res) {
        console.log('req: ', req.params.id);
        try {
            const deleteMovie = await MoviesModel.deleteMovie(req.params.id)
            console.log('deleteMovie: ', deleteMovie.result);
            res.status(200).json(deleteMovie.result)
        } catch (error) {
            res.status(500).json(error)
            console.log(error)
        }
    }
    
    static async edit(req, res) {
        console.log('req: ', req.params.id);
        try {
            const editMovie = await MoviesModel.editMovie(req.params.id, req.body)
            res.status(200).json(editMovie)
        } catch (error) {
            res.status(500).json(error)
            console.log(error)
        }
    }
}

module.exports = { MoviesCont };