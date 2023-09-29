const router = require('express').Router();
const {getUsers, getUser, createUser} = require('../controllers/users');

// Get all users
router.get('/users', getUsers);

// Get user by id
router.get('/users/:userId', getUser);

// Create new user
router.post('/users', createUser);

module.exports = router;
