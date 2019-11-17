import { ConnectionOptions } from 'typeorm';
import { isProduction } from './src/config/config.helper';

const config: ConnectionOptions = {
  name: "default",
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  logging: !isProduction(),
  entities: ["./src/modules/**/*.model.pg*"],
  cli: {
    migrationsDir: "src/migrations"
  },
};
 
export = {
  ...config,
  seeds: ["src/database/**/*.seed.ts"],
  factories: ["src/database/**/*Factory.ts"]
}