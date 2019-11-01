import { InputType, Field } from 'type-graphql';
import { Length } from 'class-validator';

import { IsIdBelongingToUser } from '../../lib/utils/utils.custom.decorators';

@InputType()
export class createEventInput {
  @Field({ nullable: false })
  @Length(30, 255)
  event: string;

  @Field({ nullable: false })
  @IsIdBelongingToUser()
  createdBy: string;
}
