import 'reflect-metadata';
import * as express from 'express';
import { createConnections } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import { eventResolver } from './modules/event/Publish';
import { registerResolver } from './modules/user/Register';

const init = async () => {
  const connection = await createConnections();

  const schema = await buildSchema({
    resolvers: [registerResolver, eventResolver]
  });

  const apolloServer = new ApolloServer({
    schema,
    context: () => ({ connection })
  });

  const app = express();

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () =>
    console.log('server started on http://localhost:4000/graphql')
  );
};

init();
