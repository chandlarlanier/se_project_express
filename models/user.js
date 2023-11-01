const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const user = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: "You must enter a valid URL",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: "You must enter a valid email",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

user.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email })
    .select("+password")
    .then((foundUser) => {
      if (!foundUser) {
        return Promise.reject("User not Found");
      }

      return bcrypt.compare(password, foundUser.password).then((match) => {
        if (!match) {
        return Promise.reject("Incorrect email or password");
        }
        if (match) {
          console.log("ITS A MATCH");
        }

        return foundUser;
      });
    });
};

module.exports = mongoose.model("users", user);
