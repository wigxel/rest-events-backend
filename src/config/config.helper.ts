export const getDbUrl = (db: string = 'postgres') => {
  if (db === 'mongodb') return process.env.MONGODB_URL_DEV!;
  return process.env.POSTGRES_URL_DEV!;
};

export const isProduction = () => {
  return process.env.NODE_ENV === 'production' ? true : false;
};
