const mongoose = require("mongoose");
const validator = require("validator");

const clothingItem = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  weather: {
    type: String,
    required: true,
    enum: ["hot", "warm", "cold"],
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: "Link is not valid",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  likes: {
    type: mongoose.Schema.Types.ObjectId,
    default: [],
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

module.exports = mongoose.model("clothingItems", clothingItem);
