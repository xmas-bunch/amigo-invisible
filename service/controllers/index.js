const session = require('./session');
const users = require('./users');
const gifts = require('./gifts');

const makeCoffee = (req, res) => {
    res.status(418).json({info: "Don't know how to make coffee"});
};

exports.login = session.login;
exports.getUsers = users.getUsers;
exports.updateUser = users.updateUser;
exports.getGifts = gifts.getGifts;
exports.drawGift = gifts.drawGift;
exports.makeCoffee = makeCoffee;
