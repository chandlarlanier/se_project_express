const router = require('express').Router();

const {createItem, getItems, deleteItem, likeItem, unlikeItem} = require('../controllers/clothingItems');

//CRUD

// Create
router.post('/', createItem)

// Read
router.get('/', getItems);

// Update
// router.put('/:itemId', updateItem);
router.put('/:itemId/likes', likeItem)

// Delete
router.delete('/:itemId', deleteItem);
router.delete('/items/:itemId/likes', unlikeItem);

module.exports = router;
