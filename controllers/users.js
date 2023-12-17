const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const BadRequestError = require("../utils/errors/BadRequest");
const ConflictError = require("../utils/errors/Conflict");
const NotFoundError = require("../utils/errors/NotFound");
const { JWT_SECRET } = require("../utils/config");

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        throw new ConflictError("User with this email already exists");
      }
      return bcrypt
        .hash(password, 10)
        .then((hash) => User.create({ name, avatar, email, password: hash }))
        .then((newUser) => {
          res.send({
            name,
            avatar,
            _id: newUser._id,
            email: newUser.email,
          });
        });
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        next(new BadRequestError("Validation error"));
      } else {
        next(error);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  return User.findUserByCredentials(email, password)
    .then((user) => {
      console.log(user);
      return res.status(200).send({
        token: jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" }),
      });
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError("User not found");
    })
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { $set: { name, avatar } },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFoundError("User not found");
    })
    .then((updatedUser) => {
      res.send({ name: updatedUser.name, avatar: updatedUser.avatar });
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        next(new BadRequestError("Validation error"));
      } else {
        next(error);
      }
    });
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateUser,
};
