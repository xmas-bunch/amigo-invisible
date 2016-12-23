const models = require('../models');

module.exports.getUsers = (req, res) => {
    return models.User.findAll({
        attributes: ['id', 'username', 'password'],
    })
        .then(results => {
            res.json(results.map(user => {
                return {
                    id: user.id,
                    username: user.username,
                    hasPassword: !!user.password
                }
            }));
        })
        .catch(err => {
            console.log(err)
        })
};

module.exports.updateUser = (req, res) => {
    if (!req.body.password1 || !req.body.password2) {
        res.status(400).json({info: 'password missing'});
    } else if (req.body.password1 != req.body.password2) {
        res.status(400).json({info: 'password mismatch'});
    } else {
        models.User.findOne({
            where: {id: req.params.id}
        })
            .then(user => {
                if (!user) {
                    throw new Error('user not found')
                } else {
                    user.password = req.body.password1;
                    return user.save();
                }
            })
            .then(user => {
                res.json({info: 'user updated'});
            })
            .catch(err => {
                if (err.message == 'user not found') {
                    res.status(404).json({info: err.message});
                } else {
                    console.log(err);
                }
            });
    }
};
