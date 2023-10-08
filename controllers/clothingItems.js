const ClothingItem = require("../models/clothingItem");
const { handleError } = require("../utils/errors");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      res.status(200).send(item);
    })
    .catch((error) => {
      handleError(req, res, error);
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => {
      res.status(200).send(items);
    })
    .catch((error) => {
      handleError(error);
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndRemove(itemId)
    .orFail()
    .then(() => {
      res.status(200).send({ message: "Item deleted" });
    })
    .catch((error) => {
      handleError(req, res, error);
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
      res.status(200).send(item);
    })
    .catch((error) => {
      handleError(req, res, error);
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
        .send(item)
        .catch((error) => {
          handleError(req, res, error);
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
