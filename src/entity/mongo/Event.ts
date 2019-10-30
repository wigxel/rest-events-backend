import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

import { ObjectIdScalar } from './../../utils/object-id.scalar';

@ObjectType()
@Entity({ database: 'mongo' })
export class Event {
  @Field(() => ObjectIdScalar)
  @ObjectIdColumn()
  id: ObjectID;

  @Field()
  @Column({ type: 'text' })
  event: string;

  @Field(() => Date, { nullable: true })
  @Column({ type: 'date' })
  createdDate: Date;

  @Field()
  @Column({ type: 'text' })
  createdBy: string;
}
