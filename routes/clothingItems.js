const router = require('express').Router();

const {createItem, getItems, deleteItem, likeItem, unlikeItem} = require('../controllers/clothingItems');

// Create new clothing item
router.post('/items', createItem)

// Get all clothing items
router.get('/items', getItems);

// Delete clothing item
router.delete('/items/:itemId', deleteItem);

// Like clothing item
router.put('/items/:itemId/likes', likeItem)

// Unlike clothing item
router.delete('/items/:itemId/likes', unlikeItem);

module.exports = router;
