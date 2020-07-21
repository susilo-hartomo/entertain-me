import { gql } from 'apollo-boost'

export const GET_MOVIES = gql`
  {
    movies {
        _id
        title
        overview
        poster_path
        popularity
        tag
    }
  }
`;

export const GET_MOVIE = gql`
query getMovie($id: ID!) {
    getMovie(_id: $id) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`;

export const CREATE_MOVIE = gql`
  mutation addMovie(
    $title: String!
    $overview: String!
    $poster_path: String!
    $popularity: Float!
    $tag: [String]!
  ) {
    addMovie(
        title: $title
        overview: $overview
        poster_path: $poster_path
        popularity: $popularity
        tag: $tag
    ) {
      _id
      title
      overview
      poster_path
      popularity
      tag
    }
  }
`;

export const DELETE_MOVIE = gql`
  mutation deleteMovie($id: ID!) {
    deleteMovie(id: $id) {
      n
      ok
    }
  }
`;

export const ADD_MOVIE_TO_FAVORITE_MOVIES = gql`
  mutation addMovieToFavoriteMovies(
    $id: ID!
    $title: String!
    $overview: String!
    $poster_path: String!
    $popularity: Float!
    $tag: [String]!
  ) {
    addMovieToFavoriteMovies(
      _id: $id
      title: $title
      overview: $overview
      poster_path: $poster_path
      popularity: $popularity
      tag: $tag
    ) @client {
      _id
      title
      overview
      poster_path
      popularity
      tag
    }
  }
`;

export const REMOVE_MOVIE_FROM_FAVORITE_MOVIES = gql`
  mutation removeMovieFromFavoriteMovies($id: ID!) {
    removeMovieFromFavoriteMovies(_id: $id) @client
  }
`;

export const GET_FAVORITE_MOVIES = gql`
  query {
    favoriteMovies @client {
      _id
      title
      overview
      poster_path
      popularity
      tag
    }
  }
`;