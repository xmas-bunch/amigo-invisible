const Sequelize = require('sequelize');

const databases = {
    development: new Sequelize('dev', 'amigo', 'invisible', {
        dialect: 'sqlite',
        storage: './data/dev.db'
    }),
    test: new Sequelize('test', 'amigo', 'invisible', {
        dialect: 'sqlite',
        storage: './data/test.db',
        logging: false
    })
};

const db = databases[process.env.NODE_ENV];

module.exports = db;
