import { Entity, BaseEntity, PrimaryColumn, Column } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import uuidv4 from 'uuid/v4';

import { Event } from '../event/event.model.mongo';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryColumn({ default: uuidv4() })
  _id: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Field()
  @Column({ default: new Date() })
  createAt: string;

  @Field(() => [Event])
  event: [Event];
}
