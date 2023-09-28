const mongoose = require("mongoose");
const validator = require("validator");

const User = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isUrl(v),
      message: "Link is not valid",
    },
  },
});

module.exports = User;
