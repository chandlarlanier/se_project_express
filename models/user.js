const mongoose = require("mongoose");
const validator = require("validator");

const User = new mongoose.Schema({
  name: {
    type: String,
    default: "Elise Bouer",
    required: true,
  },
  avatar: {
    type: String,
    default: "https://example.com",
    required: true,
    validate: {
      validator: (v) => validator.isUrl(v),
      message: "Link is not valid",
    },
  },
});

module.exports = User;
