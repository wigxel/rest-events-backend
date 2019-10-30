import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { getMongoRepository, MongoRepository } from 'typeorm';

import { Event } from './../../entity/mongo/Event';

@Resolver(() => Event)
export class eventResolver {
  eventRepo: MongoRepository<Event> = getMongoRepository(Event, 'mongo');

  @Query(() => [Event], { nullable: true })
  async event(): Promise<Array<Event>> {
    return this.eventRepo.find();
  }

  @Mutation(() => Event, { nullable: true })
  async publish(
    @Arg('event') event: string,
    @Arg('createdBy') createdBy: string
  ): Promise<Event | null> {
    try {
      return this.eventRepo.save({ event, createdBy, createdDate: new Date() });
    } catch (err) {
      console.error('--- >>>', err.detail);
      return null;
    }
  }
}
