const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('gift',
    {
        wasGiven: {
            type: Sequelize.BOOLEAN,
        }
    }
);
