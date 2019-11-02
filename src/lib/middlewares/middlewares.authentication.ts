import { MiddlewareFn } from 'type-graphql';

import { ApolloServerContext } from '../types/types.interfaces';

export const IsAuthorized: MiddlewareFn<ApolloServerContext> = async (
  { context },
  next
) => {
  if (!context.req.session!.userId) throw Error('not authenticated');
  return next();
};
