import { IsEmail } from 'class-validator';
import { Field, InputType } from 'type-graphql';

import { IsEmailAlreadyExist } from '../../lib/utils/utils.custom.decorators';

@InputType()
export class createUserInput {
  @Field({ nullable: false })
  @IsEmail()
  @IsEmailAlreadyExist()
  email: string;

  @Field({ nullable: false })
  password: string;
}

@InputType()
export class loginUserInput {
  @Field({ nullable: false })
  @IsEmail()
  email: string;

  @Field({ nullable: false })
  password: string;
}
