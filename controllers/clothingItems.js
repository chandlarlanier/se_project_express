const ClothingItem = require("../models/clothingItem");
const { handleError, ERROR_401, ERROR_403 } = require("../utils/errors");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  console.log(req.user._id);

  if (!name) {
    return res.status(ERROR_401).send({ message: "Name field is required" });
  }

  if (!weather) {
    return res.status(ERROR_401).send({ message: "Weather field is required" });
  }

  if (!imageUrl) {
    return res.status(ERROR_401).send({ message: "Image URL is required" });
  }

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      res.send(item);
    })
    .catch((error) => {
      handleError(req, res, error);
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => {
      res.send(items);
    })
    .catch((error) => {
      handleError(error);
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (String(item.owner) !== req.user._id) {
        return res
          .status(ERROR_403)
          .send({ message: "User unauthorized to delete item" });
      }

      return item.deleteOne().then(() => {
        res.send({ message: "Item has been deleted" });
      });
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
      res.send(item);
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
      res.send(item);
    })
    .catch((error) => {
      handleError(req, res, error);
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
};
