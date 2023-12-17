const router = require("express").Router();
const { authorize } = require("../middlewares/auth");
const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItems");
const {
  validateClothingItem,
  validateId,
} = require("../middlewares/validation");

router.post("/", authorize, validateClothingItem, createItem);
router.get("/", getItems);
router.put("/:itemId/likes", authorize, validateId, likeItem);
router.delete("/:itemId/likes", authorize, validateId, unlikeItem);
router.delete("/:itemId", authorize, validateId, deleteItem);

module.exports = router;
