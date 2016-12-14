process.env.NODE_ENV = 'development';

const app = require('./app');
const models = require('./models');
const db = require('./db');

const resetDB = process.argv.indexOf('reset-db') != -1;

db.sync({force: resetDB})
    .then(function () {
        console.log('Database ready...');
        if (resetDB) {
            return models.bootstrapDB();
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
