import Faker from 'faker';
import { define } from "typeorm-seeding";
import uuid from 'uuid';
import { User } from "../../modules/user/user.model.pg";

// @ts-ignore
define(User, (faker: typeof Faker, settings: { password: string }) => {
  const gender = faker.random.number(1);
  const firstName = faker.name.firstName(gender);
  const lastName = faker.name.lastName(gender);
  const email = faker.internet.email(firstName, lastName);

  const user = new User();
  user._id = uuid();
  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;
  user.password = settings.password;
  
  return user;
});