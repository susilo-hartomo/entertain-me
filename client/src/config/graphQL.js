import ApolloClient from 'apollo-boost'
import { GET_FAVORITE_MOVIES } from '../queries/index'

const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    clientState: {
        resolvers: {
            Mutation: {
                addMovieToFavoriteMovies: (_, variables, client) => {
                    console.log('variables: ', variables);
                    const { favoriteMovies } = client.cache.readQuery({
                        query: GET_FAVORITE_MOVIES,
                    });

                    const movie = {
                        ...variables,
                        tag: [...variables.tag],
                        __typename: "FavoriteMovie",
                    };
                    const newFavoriteMovies = [...favoriteMovies, movie];
                    client.cache.writeData({
                        data: {
                            favoriteMovies: newFavoriteMovies,
                        },
                    });
                    console.log(client.cache.readQuery({
                        query: GET_FAVORITE_MOVIES,
                    }))
                },
                // removeMovieFromFavoriteMovies: (_, variables, client) => {
                //   console.log("masuk remove", variables)
                //   const { favoriteMovies } = client.cache.readQuery({
                //     query: GET_FAVORITE_MOVIES,
                //   });
                //   const newFavoriteMovies = favoriteMovies.filter(
                //     (movie) => movie._id !== variables._id
                //   );
                //   client.cache.writeData({
                //     data: {
                //       favoriteMovies: newFavoriteMovies,
                //     },
                //   });
                // },
            },
        },
        defaults: {
            favoriteTvSeries: [],
            favoriteMovies: []
        }
    }
})


export default client
