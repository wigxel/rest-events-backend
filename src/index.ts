import 'reflect-metadata';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';

import { redis } from './config/config.redis';
import { mongooseConnection } from './config/config.mongo';
import { typeormConnection } from './config/config.typeorm';

// import { eventController } from './modules/event/event.controller';
import { userController } from './modules/user/user.controller';

(async () => {
  await mongooseConnection();
  await typeormConnection();

  const schema = await buildSchema({
    validate: true,
    resolvers: [userController],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    }
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => ({ req })
  });

  const app = express();

  const RedisStore = connectRedis(session);

  app.use(
    cors({
      credentials: true,
      origin: process.env.CORS_ORIGIN_URL
    })
  );

  app.use(
    session({
      store: new RedisStore({
        client: redis as any
      }),
      resave: false,
      saveUninitialized: false,
      name: process.env.SESSION_ID as string,
      secret: process.env.SESSION_SECRET as string,
      cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
        secure: process.env.NODE_ENV === 'production'
      }
    })
  );

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () =>
    console.log('server started on http://localhost:4000/graphql')
  );
})();
