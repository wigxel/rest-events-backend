import 'reflect-metadata';
import { createConnection } from 'typeorm';
import config from '../../ormconfig';

export const typeormConnection = async () => {
  let typeormConnection = null;
  try {
    typeormConnection = await createConnection(config);

    console.log('>>> successfully connected to postgres \n');
  } catch (err) {
    console.error('>>> Failed to connect postgres \n', err);
  } finally {
    return typeormConnection;
  }
};
