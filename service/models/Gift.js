const Sequelize = require('sequelize');
const db = require('../db');

var Gift = db.define('gift',
  {
    wasGiven: {
      type: Sequelize.BOOLEAN,
    }
  }
);

module.exports = Gift;
