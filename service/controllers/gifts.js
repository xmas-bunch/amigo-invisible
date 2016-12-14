const models = require('../models');
const gifts_limit = 2;

module.exports.getGifts = function (req, res) {

    models.User.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(function (user) {
            if (!user) {
                throw new Error('user not found');
            } else {
                return models.Gift.findAll({
                    attributes: ['id'],
                    where: {
                        giverId: user.id
                    },
                    include: [
                        {model: models.User, as: 'giver', attributes: ['id', 'username']},
                        {model: models.User, as: 'recipient', attributes: ['id', 'username']},
                    ]
                })
            }
        })
        .then(function (results) {
            res.json(results);
        })
        .catch(function (err) {
            if (err.message == 'user not found') {
                res.status(404).json({error: err.message})
            } else {
                res.status(500).end();
                console.log(err);
            }
        })
};

module.exports.drawGift = function (req, res) {
    let user;
    models.User.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(function (res) {
            if (!res) {
                throw new Error('user not found');
            }
            user = res;
            return models.Gift.findAll({
                where: {
                    giverId: user.id
                }
            });
        })
        .then(function (giftsToGive) {
            if (giftsToGive.length >= gifts_limit) {
                throw new Error('gifts limit reached');
            } else {
                return models.Gift.findAll({
                    where: {
                        recipientId: {$ne: user.id},
                        giverId: null
                    }
                })
            }
        })
        .then(function (gifts) {
            if (!gifts.length) {
                throw new Error('no gifts unassigned');
            } else {
                let gift = gifts[Math.floor(Math.random() * gifts.length)];
                gift.giverId = user.id;
                return gift.save();
            }
        })
        .then(function (gift) {
            res.status(201).json({'ok': 'gift drawn'});
            return true;
        })
        .catch(function (err) {
            if (err.message == 'gifts limit reached') {
                res.status(400).json({'error': err.message});
            } else if (err.message == 'user not found') {
                res.status(404).json({error: err.message})
            } else {
                res.status(500).end();
                console.log(err);
            }
        });
};
