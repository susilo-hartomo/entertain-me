const { ApolloServer, makeExecutableSchema, gql } = require('apollo-server');
const { typeDefsMovie, resolversMovie } = require('./Schema/schemaMovie');
const { typeDefsTvSerie, resolversTvSerie } = require('./Schema/schemaTvSerie');

//microservice
require('../Services/Movies/index')
require('../Services/TvSeries/index')

const typeDefs = gql`
    type Query
    type Mutation
`;

const schema = makeExecutableSchema ({
    typeDefs: [typeDefs, typeDefsMovie, typeDefsTvSerie],
    resolvers: [resolversMovie, resolversTvSerie],
})

const server = new ApolloServer({
    schema,
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});