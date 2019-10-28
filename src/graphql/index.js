const { ApolloServer } = require('apollo-server-express');

const { schema } = require('./schema/');
const { resolvers } = require('./resolvers');

const apolloServerBuilder = app => {
  const server = new ApolloServer({ typeDefs: schema, resolvers });
  server.applyMiddleware({ app, path: '/' });
};

module.exports = { apolloServerBuilder };
