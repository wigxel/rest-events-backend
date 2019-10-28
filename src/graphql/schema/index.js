const { gql } = require('apollo-server-express');

const schema = gql`
  type Query {
    hello: String!
  }
`;

module.exports = { schema };
