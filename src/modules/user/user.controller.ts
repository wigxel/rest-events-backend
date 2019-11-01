import {
  Resolver,
  Query,
  Mutation,
  Arg,
  FieldResolver,
  Root,
  Ctx
} from 'type-graphql';
import * as bcrypt from 'bcryptjs';

import { ApolloServerContext } from '../../lib/types/interfaces';

import { User } from './user.model.pg';
import { eventModel, Event } from '../event/event.model.mongo';
import { createUserInput, loginUserInput } from './user.validation';

@Resolver(User)
export class userController {
  @FieldResolver()
  async event(@Root() parent: User): Promise<Array<Event>> {
    try {
      return await eventModel.find({ createdBy: parent._id });
    } catch (err) {
      console.log('xxx> user.controller', err);
      return [];
    }
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: ApolloServerContext): Promise<User | undefined> {
    if (!ctx.req.session!.userId) return;
    const user = await User.findOne(ctx.req.session!.userId);
    return user;
  }

  @Query(() => [User])
  async user(): Promise<Array<User>> {
    try {
      return User.find();
    } catch (err) {
      console.error('xxx> user.controller', err);
      return [];
    }
  }

  @Mutation(() => User)
  async createUser(@Arg('input') { email, password }: createUserInput): Promise<
    User
  > {
    const hashedPassword = await bcrypt.hash(password, 12);
    return await User.create({
      email,
      password: hashedPassword
    }).save();
  }

  @Mutation(() => User, { nullable: true })
  async loginUser(
    @Arg('input')
    { email, password }: loginUserInput,
    @Ctx() ctx: ApolloServerContext
  ): Promise<User | undefined> {
    const user = await User.findOne({ where: { email } });
    if (!user) return;

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) return;

    ctx.req.session!.userId = user._id;

    return user;
  }
}
