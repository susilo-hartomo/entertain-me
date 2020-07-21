const axios = require("axios");
const { gql } = require('apollo-server');
const Redis = require('ioredis')
const redis = new Redis()

const typeDefsTvSerie = gql`
    
    type tvserie {
        _id: ID!
        title: String!
        overview : String!
        poster_path : String!
        popularity : Float!
        tag : [String]!
    }

    type deleteResponseTvSerie {
        n: Int!
        ok: Int!
    }

    extend type Query {
        tvseries: [tvserie!]
        tvserie(id: ID!): tvserie!
    }

    extend type Mutation {
        addTvSerie(
            title: String!
            overview : String!
            poster_path : String!
            popularity : Float!
            tag : [String]!
        ) : tvserie! 

        editTvSerie(
            _id : ID
            title: String!
            overview : String!
            poster_path : String!
            popularity : Float!
            tag : [String]!
        ) : movie!

        deleteTvSerie(id: ID) : deleteResponseTvSerie!
    }

`;


const resolversTvSerie = {
    Query: {
        tvseries: () => {
            return axios({
                url: 'http://localhost:3002/tvseries',
                method: 'get'
            })
                .then((result) => {
                    return result.data
                }).catch((err) => {
                    console.log(err)
                });
        },

        tvserie: (parent, args, contex, info) => {
            const { id } = args
            return axios({
                url: 'http://localhost:3002/tvseries/' + id,
                method: 'get'
            })
                .then((result) => {
                    return result.data
                }).catch((err) => {
                    console.log(err)
                });
        },
    },

    Mutation: {
        addTvSerie: (_, args) => {
            const newMovie = {
                title: args.title,
                overview: args.overview,
                poster_path: args.poster_path,
                popularity: args.popularity,
                tag: args.tag,
            }
            return axios({
                url: 'http://localhost:3002/tvseries',
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

        editTvSerie: (_, args) => {
            const updateMovie = {
                title: args.title,
                overview: args.overview,
                poster_path: args.poster_path,
                popularity: args.popularity,
                tag: args.tag,
            }
            return axios({
                url: 'http://localhost:3002/tvseries',
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

        deleteTvSerie: (_, args) => {
            const { id } = args
            return axios({
                url: 'http://localhost:3002/tvseries/' + id,
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
    resolversTvSerie,
    typeDefsTvSerie,
};
