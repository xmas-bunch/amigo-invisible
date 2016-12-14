const Sequelize = require('sequelize');
const Gift = require('./Gift');
const User = require('./User');

Gift.belongsTo(User, {as: 'giver', foreignKey: 'giverId'});
User.hasMany(Gift, {as: 'giftsToGive'});

Gift.belongsTo(User, {as: 'recipient', foreignKey: 'recipientId'});
User.hasMany(Gift, {as: 'giftsToReceive'});

function bootstrapDB (users) {
    return User.bulkCreate(users.map(name => {
        return {username: name}
    }))
        .then(function (e) {
            return User.findAll();
        })
        .then(function (users) {
            let createGifts = users.map(user => {
                return Gift.bulkCreate([
                    {recipientId: user.id, wasGiven: false},
                    {recipientId: user.id, wasGiven: false}
                ])
            });
            return Sequelize.Promise.all(createGifts);
        });
}

exports.Gift = Gift;
exports.User = User;
exports.bootstrapDB = bootstrapDB;
