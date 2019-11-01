import { Resolver, Mutation, Query, Arg, Authorized } from 'type-graphql';
import { Event, eventModel } from './event.model.mongo';
import { createEventInput } from './event.validation';

@Resolver(Event)
export class eventController {
  @Query(() => [Event])
  async event(): Promise<Array<Event>> {
    try {
      return eventModel.find();
    } catch (err) {
      console.error('xxx> event.controller', err);
      return [];
    }
  }

  @Authorized()
  @Mutation(() => Boolean)
  async createEvent(@Arg('input')
  {
    event,
    createdBy
  }: createEventInput): Promise<Boolean> {
    try {
      await eventModel.create({
        event,
        createdBy
      });

      return true;
    } catch (err) {
      console.error('xxx> event.controller', err);
      return false;
    }
  }
}
