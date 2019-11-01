import 'reflect-metadata';
import { createConnection } from 'typeorm';

import { isProduction } from './config.helper';
 
export const typeormConnection = async () => {
  let typeormConnection = null;
  try {
    // TODO: fix .env postgres url
    // TODO: use postgres url
    typeormConnection = await createConnection({
      name: 'default',
      type: 'postgres',
      password: '',
      username: 'postgres',
      database: 'rest_events_dv1',
      synchronize: true,
      logging: !isProduction(),
      entities: ['./src/modules/**/*.model.pg*']
    });

    console.log('>>> successfully connected to postgres \n');
  } catch (err) {
    console.error('>>> Failed to connect postgres \n', err);
  } finally {
    return typeormConnection;
  }
};
