const models = require('../models');

module.exports.getUsers = function (req, res) {
  return models.User.findAll({
    attributes: ['id', 'username', 'password'],
  })
  .then(function (results) {
    res.json(results.map(user => {
      return {
        id: user.id,
        username: user.username,
        hasPassword: !!user.password
      }
    }));
  })
  .catch(function (err) {
    console.log(err)
  })
}

module.exports.updateUser = function (req, res) {
  if (!req.body.username || !req.body.password1 || !req.body.password2) {
    res.status(400).json({'error': 'username or password missing'});
  } else if (req.body.password1 != req.body.password2) {
    res.status(400).json({'error': 'password mismatch'});
  } else {
    models.User.findOne({
      where: {id: req.params.id}
    })
    .then(function (user) {
      if (!user) {
        throw new Error('user not found')
      } else {
        user.username = req.body.username;
        user.password = req.body.password1;
        return user.save();
      }
    })
    .then(function (user) {
      res.json({ok: 'user updated'});
    })
    .catch(function (err) {
      if (err.message == 'user not found') {
        res.status(404).json({error: err.message});
      } else {
        console.log(err);
      }
    });
  }
}
