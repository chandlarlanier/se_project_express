const ClothingItem = require("../models/clothingItem");
const {
  handleError,
  ERROR_403,
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} = require("../utils/errors");

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  console.log(req.user._id);

  return ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      res.send(item);
    })
    .catch((error) => {
      if (error.name == "ValidationError") {
        next(new BadRequestError("Validation error"));
      } else {
        next(error);
      }
    });
};

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => {
      res.send(items);
    })
    .catch(next);
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail(() => {
      throw new NotFoundError("Invalid item ID");
    })
    .then((item) => {
      if (String(item.owner) !== req.user._id) {
        throw new ForbiddenError("User not authorized to delete this item");
      }

      return item.deleteOne().then(() => {
        res.send({ message: "Item has been deleted" });
      });
    })
    .catch(next);
};

const likeItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    {
      $addToSet: { likes: req.user._id },
    },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError("Invalid item ID");
    })
    .then((item) => {
      res.send(item);
    })
    .catch(next);
};

const unlikeItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError("Invalid item ID");
    })
    .then((item) => {
      res.send(item);
    })
    .catch(next);
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
};
