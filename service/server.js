process.env.NODE_ENV = 'development';

const Sequelize = require('sequelize');
const app = require('./app');
const models = require('./models');
const db = require('./db');

var resetDB = process.argv.indexOf('reset-db') != -1;
var user = users = ['Ale', 'Angie', 'Anto', 'Chechu', 'Cielo', 'Juampi', 'Kako', 'Kathy', 'Nico', 'Tuli']

db.sync({force: resetDB})
  .then(function () {
    console.log('Database ready...');
    if (resetDB) {
      return models.bootstrapDB(users);
    } else {
      return true;
    }
  })
  .then(function (bootrapped) {
    if (resetDB) {
      console.log('Database bootstrapped.')
    }
    app.listen(3000, function () {
      console.log('Listening on port 3000!');
    });
  })
