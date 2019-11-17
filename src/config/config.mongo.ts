import { mongoose } from '@typegoose/typegoose';

import { getDbUrl, isProduction } from './config.helper';

if (!isProduction()) {
  mongoose.set("debug", true);
}

export const mongooseConnection = async () => {
  try {
    const connection = await mongoose.connect(getDbUrl('mongodb'), {
      dbName: process.env.MONGODB_DATABASE_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(">> Successfully connected to MongoDB \n");
    
    return connection;
  } catch (err) {
    console.error('>> Failed to connect MongoDB \n', err);
  }

  return null;
};
