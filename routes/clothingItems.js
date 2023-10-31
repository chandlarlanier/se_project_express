const router = require("express").Router();
const { authorize } = require("../middlewares/auth");
const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItems");

router.post("/", authorize, createItem);
router.get("/", getItems);
router.put("/:itemId/likes", authorize, likeItem);
router.delete("/:itemId/likes", authorize, unlikeItem);
router.delete("/:itemId", authorize, deleteItem);

module.exports = router;
