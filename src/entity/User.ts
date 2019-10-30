import { Event } from './mongo/Event';
import {
  Entity,
  PrimaryColumn,
  Column,
  BeforeInsert,
  BaseEntity
} from 'typeorm';
import * as uuidv4 from 'uuid/v4';
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Field({ nullable: false })
  @Column({ type: 'text', width: 255, unique: true, nullable: false })
  email: string;

  @Column({ type: 'text', nullable: false })
  password: string;

  @Field(() => [Event], { nullable: true })
  events: [Event];

  @BeforeInsert()
  addId() {
    this.id = uuidv4();
  }
}
