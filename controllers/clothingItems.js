const ClothingItem = require("../models/clothingItem");
const {
  BAD_REQUEST_ERROR,
  SERVER_ERROR,
  NOT_FOUND_ERROR,
} = require("../utils/errors");

const createItem = async (req, res) => {
  console.log(req.user._id);

  const { name, weather, imageUrl } = req.body;

  try {
    const item = await ClothingItem.create({
      name,
      weather,
      imageUrl,
      owner: req.user._id,
    });

    res.status(201).json(item);
  } catch (message) {
    if (message.name === "ValidationError") {
      return res
        .status(BAD_REQUEST_ERROR)
        .json({ message: "Validation error" });
    }
    res.status(SERVER_ERROR).json({ message: "Error at createItem" });
  }
  return createItem;
};

const getItems = async (req, res) => {
  try {
    const items = await ClothingItem.find();
    res.json(items);
  } catch (message) {
    res.status(SERVER_ERROR).json({ message: "Error at getItems" });
  }
};

const deleteItem = async (req, res) => {
  const { itemId } = req.params;
  try {
    const deletedItem = await ClothingItem.findByIdAndRemove(itemId);
    if (!deletedItem) {
      return res.status(NOT_FOUND_ERROR).json({ message: "Item not found" });
    }
    res.json(deletedItem);
  } catch (message) {
    if (message.name === "CastError") {
      return res.status(BAD_REQUEST_ERROR).json({ message: "Invalid itemId" });
    }
    res.status(SERVER_ERROR).json({ message: "Error at deleteItem" });
  }
  return deleteItem;
};

const likeItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error("Invalid item ID");
      error.statusCode = NOT_FOUND_ERROR;
      throw error;
    })
    .then((item) => {
      res.json(item);
    })
    .catch((e) => {
      if (e.name === "CastError") {
        return res
          .status(BAD_REQUEST_ERROR)
          .json({ message: "Item ID not found" });
      }
      console.error(
        `Error name ${e.name} with message ${e.message} has occurred`,
      );
      const errorMessage =
        e.statusCode === NOT_FOUND_ERROR ? "Item not found" : "Server error";
      return res
        .status(e.statusCode || SERVER_ERROR)
        .json({ message: errorMessage });
    });
};

const unlikeItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error("Invalid itemId");
      error.statusCode = NOT_FOUND_ERROR;
      throw error;
    })
    .then((item) => {
      res.json(item);
    })
    .catch((e) => {
      if (e.name === "CastError") {
        return res
          .status(BAD_REQUEST_ERROR)
          .json({ message: "Item not found" });
      }
      console.error(
        `Error name ${e.name} with message ${e.message} has occurred`,
      );
      const errorMessage =
        e.statusCode === NOT_FOUND_ERROR ? "Item not found" : "Server error";
      return res
        .status(e.statusCode || SERVER_ERROR)
        .json({ message: errorMessage });
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
};
