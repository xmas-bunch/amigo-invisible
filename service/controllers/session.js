const models = require('../models');

module.exports.login = function (req, res) {
    // Make sure both fields are passed
    if (!req.body.username || !req.body.password) {
        res.status(400).json({'error': 'username and password required'})
        return;
    }

    // Validate credentials (by searching for user)
    models.User.findOne({
        where: {
            username: req.body.username,
            password: req.body.password
        }
    })
        .then(function (user) {
            if (!user) {
                res.status(403).json({error: 'invalid username or password'});
            } else {
                res.status(200).json({
                    id: user.id,
                    username: user.username,
                    hasPassword: !!user.password
                });
            }
            return true;
        })
        .catch(function (err) {
            res.status(500);
            console.log(err);
        })
};
