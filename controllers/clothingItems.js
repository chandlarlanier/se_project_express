const ClothingItem = require("../models/clothingItem");
const { handleError } = require("../utils/errors");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      res.send(item);
    })
    .catch((e) => {
      handleError(req, res, e);
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => {
      res.send(items);
    })
    .catch((e) => {
      handleError(e);
    });
};

const deleteItem = (req, res) => {
  const { itemID } = req.params;

  ClothingItem.findByIdAndRemove(itemId)
    .orFail()
    .then(() => {
      res.send({ message: "Item deleted" });
    })
    .catch(() => {
      next(new BAD_REQUEST_ERROR("Invalid data"));
    });
};

const likeItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    {
      $addToSet: { likes: req.user._id },
    },
    { new: true },
  )
    .orFail()
    .then((item) => {
      res.status(200).send(item); // make item an object?
    })
    .catch((e) => {
      handleError(req, res, e);
    });
};

const unlikeItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((item) => {
      res
        .status(200)
        .send(item) // make item an object?
        .catch((e) => {
          handleError(req, res, e);
        });
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
};
