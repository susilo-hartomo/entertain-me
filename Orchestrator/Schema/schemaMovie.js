const axios = require("axios");
const { gql } = require('apollo-server');
const Redis = require('ioredis')
const redis = new Redis()

const typeDefsMovie = gql`

    type movie {
        _id: ID!
        title: String!
        overview : String!
        poster_path : String!
        popularity : Float!
        tag : [String]!
    } 

    type deleteResponse {
        n: Int!
        ok: Int!
    }
    
    extend type Query {
        movies: [movie!]
        movie(id: ID!): movie!
    }

    extend type Mutation {
        addMovie(
            title: String!
            overview : String!
            poster_path : String!
            popularity : Float!
            tag : [String]!
        ) : movie
        
        editMovie(
            _id : ID
            title: String!
            overview : String!
            poster_path : String!
            popularity : Float!
            tag : [String]!
        ) : movie!

        deleteMovie(id: ID) : deleteResponse!
    }

`;


const resolversMovie = {
    Query: {
        movies: async () => {
            const movies = await redis.get("movies")
            if (movies) {
                console.log('movies redis : ', movies);
                return JSON.parse(movies)
            } else {
                console.log('movies tanpa redis : ', movies);
                return axios({
                    url: 'http://localhost:3001/movies',
                    method: 'get'
                })
                    .then((result) => {
                        redis.set("movies", JSON.stringify(result.data))
                        return result.data
                    }).catch((err) => {
                        console.log(err)
                    });
            }
        },

        movie: async (parent, args, contex, info) => {
            const { id } = args
            const movie = await redis.get("movie" + id)
            if (movie) {
                console.log('movies redis : ', movie);
                return JSON.parse(movie)
            } else {
                return axios({
                    url: 'http://localhost:3001/movies/' + id,
                    method: 'get'
                })
                    .then((result) => {
                        return result.data
                    }).catch((err) => {
                        console.log(err)
                    });
            }
        },
    },

    Mutation: {
        addMovie: (_, args) => {
            const newMovie = {
                title: args.title,
                overview: args.overview,
                poster_path: args.poster_path,
                popularity: args.popularity,
                tag: args.tag,
            }
            return axios({
                url: 'http://localhost:3001/movies',
                method: 'post',
                data: newMovie,
            })
                .then((result) => {
                    console.log('result: ', result.data);
                    redis.del('movies')
                    const movieId = result.data[0]._id
                    redis.set("movie" + movieId, JSON.stringify(result.data[0]))
                    return result.data[0]
                }).catch((err) => {
                    console.log(err)
                });
        },

        editMovie: (_, args) => {
            const updateMovie = {
                title: args.title,
                overview: args.overview,
                poster_path: args.poster_path,
                popularity: args.popularity,
                tag: args.tag,
            }
            return axios({
                url: 'http://localhost:3001/movies',
                method: 'put',
                data: updateMovie,
            })
                .then((result) => {
                    console.log('result: ', result.data);
                    redis.del('movies')
                    const movieId = result.data[0]._id
                    redis.set("movie" + movieId, JSON.stringify(result.data[0]))
                    return result.data[0]
                }).catch((err) => {
                    console.log(err)
                });
        },

        deleteMovie: (_, args) => {
            const { id } = args
            return axios({
                url: 'http://localhost:3001/movies/' + id,
                method: 'delete',
            })
                .then((result) => {
                    console.log('result: ', result.data);
                    redis.del('movies')
                    if (redis.get('movie' + id) === id) {
                        redis.del("movie")
                    }
                    return result.data
                }).catch((err) => {
                    console.log(err)
                });
        }

    }
};

module.exports = {
    resolversMovie,
    typeDefsMovie
};
