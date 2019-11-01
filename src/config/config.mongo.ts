import { mongoose } from '@typegoose/typegoose';

import { getDbUrl, isProduction } from './config.helper';

export const mongooseConnection = async () => {
  let mongooseConnection = null;
  try {
    mongooseConnection = await mongoose.connect(getDbUrl('mongodb'), {
      dbName: process.env.MONGODB_DATABASE_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    !isProduction() && mongoose.set('debug', true);

    console.log('>>> successfully connected to mongodb \n');
  } catch (err) {
    console.error('>>> Failed to connect mongodb \n', err);
  } finally {
    return mongooseConnection;
  }
};
