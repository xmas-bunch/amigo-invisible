const Sequelize = require('sequelize');
const db = require('../db');

let User = db.define('user',
    {
        username: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING,
        }
    }
);

module.exports = User;
