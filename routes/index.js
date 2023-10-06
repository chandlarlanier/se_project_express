const router = require('express').Router();
const clothingItem = require('./clothingItems');
const user = require('./users');

router.use('/items', clothingItem);
router.use('/users', user);


module.exports = router;
