import { ObjectType, Field } from 'type-graphql';
import { prop, getModelForClass } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

import { ObjectIdScalar } from '../../lib/utils/utils.custom.types';

@ObjectType()
export class Event extends TimeStamps {
  @Field(() => ObjectIdScalar)
  _id: string;

  @Field()
  @prop()
  event: string;

  @Field({ nullable: true })
  @prop()
  createdBy: string;

  @Field({ nullable: true })
  createdAt: Date;
}

export const eventModel = getModelForClass(Event);
