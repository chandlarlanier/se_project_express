const router = require('express').Router();

const {createItem, getItems, deleteItem, likeItem, unlikeItem} = require('../controllers/clothingItems');

router.post('/items', createItem)
router.get('/items', getItems);
router.put('/items/:itemId/likes', likeItem)
router.delete('/items/:itemId/likes', unlikeItem);
router.delete('/items/:itemId', deleteItem);


module.exports = router;
