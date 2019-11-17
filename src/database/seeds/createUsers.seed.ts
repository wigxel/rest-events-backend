import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import uuid from "uuid";
import { User } from "../../modules/user/user.model.pg";

export default class CreateUsers implements Seeder {
  // @ts-ignore
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        { _id: uuid(), firstName: "Timber", lastName: "Saw", password: 'secret', email: "timber.saw@gmail.com" }
      ])
      .execute();
    await factory(User)({ password: 'secret' }).seedMany(10);
  }
}
