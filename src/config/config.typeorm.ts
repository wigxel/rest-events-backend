import 'reflect-metadata';
import { createConnection } from 'typeorm';
import config from '../../ormconfig';

export const typeormConnection = async () => {
  try {
    const connection = await createConnection(config);
    console.log('>> Successfully connected to Postgres \n');
    return connection;
  } catch (err) {
    console.error('>> Failed to connect Postgres \n', err);
  }

  return null;
};
