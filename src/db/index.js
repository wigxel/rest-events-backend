const Sequelize = require('sequelize');
const mongoose = require('mongoose');

const sequelize = new Sequelize('rest-events', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres'
});

sequelize
  .authenticate()
  .then(() =>
    console.log('connection to postgresql has been established successfully')
  )
  .catch(err => console.error('unable to connect to postgresql: ', err));

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });
const mongodb = mongoose.connection;
mongodb.on(
  'error',
  console.error.bind(console, 'unable to connect to mongodb:')
);
mongodb.once('open', () => {
  console.log('connection to mongodb has been established successfully');
});
