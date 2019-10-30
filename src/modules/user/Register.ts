import * as bcrypt from 'bcryptjs';
import { MongoRepository, getMongoRepository } from 'typeorm';
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  FieldResolver,
  Root
} from 'type-graphql';

import { User } from './../../entity/User';
import { Event } from './../../entity/mongo/Event';

@Resolver(() => User)
export class registerResolver {
  eventRepo: MongoRepository<Event> = getMongoRepository(Event, 'mongo');

  @Query(() => [User], { nullable: false })
  async user() {
    return User.find();
  }

  @FieldResolver(() => [Event])
  async events(@Root() user: User): Promise<Array<Event>> {
    return this.eventRepo.find({ where: { createdBy: user.id } });
  }

  @Mutation(() => User, { nullable: true })
  async register(
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<User | null> {
    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = await User.create({
        email,
        password: hashedPassword
      }).save();
      return user;
    } catch (err) {
      console.error('--- >>>', err.detail);
      return null;
    }
  }
}
