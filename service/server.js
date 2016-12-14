process.env.NODE_ENV = 'development';

const app = require('./app');
const models = require('./models');
const db = require('./db');

const resetDB = process.argv.indexOf('reset-db') != -1;
const users = ['Ale', 'Angie', 'Anto', 'Chechu', 'Cielo', 'Juampi', 'Kako', 'Kathy', 'Nico', 'Tuli'];

db.sync({force: resetDB})
    .then(function () {
        console.log('Database ready...');
        if (resetDB) {
            return models.bootstrapDB(users);
        } else {
            return true;
        }
    })
    .then(function () {
        if (resetDB) {
            console.log('Database bootstrapped.')
        }
        app.listen(3000, function () {
            console.log('Listening on port 3000!');
        });
    });
