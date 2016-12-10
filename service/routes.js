const express = require('express');
const controllers = require('./controllers');

const router = express.Router();

// Session: used for login
router.post('/session', controllers.login);

// Users: used to list all users
router.get('/users', controllers.getUsers);

// User: update user password
router.put('/users/:id', controllers.updateUser);

// User gifts: list gifts or pull new gift
router.get('/users/:id/gifts', controllers.getGifts);
router.post('/users/:id/gifts', controllers.drawGift);

// Make coffee: nope
router.post('/coffee', controllers.makeCoffee);

module.exports = router;
