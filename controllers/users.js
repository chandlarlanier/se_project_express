const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { handleError, ERROR_401, ERROR_409 } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  User.findOne({ email }).then((data) => {
    if (data) {
      return res
        .status(ERROR_409)
        .send({ message: "A user with this email already exists" });
    }
    return bcrypt.hash(password, 10).then((hash) => {
      User.create({ name, avatar, email, password: hash })
        .then((user) => {
          res.send({
            data: {
              _id: user._id,
              name: user.name,
              avatar: user.avatar,
              email: user.email,
            },
          });
        })
        .catch((error) => {
          handleError(req, res, error);
        });
    });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign(
          {
            _id: user._id,
          },
          JWT_SECRET,
          { expiresIn: "7d" },
        ),
      });
    })
    .catch(() => {
      return res.status(ERROR_401).send({ message: "Login failed" });
    });
};

const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      handleError(req, res, error);
    });
};

const updateUser = (req, res) => {
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { $set: { name, avatar } },
    { new: true, runValidators: true },
  )
    .then((updatedUser) => {
      res.send({ name: updatedUser.name, avatar: updatedUser.avatar });
    })
    .catch((error) => {
      handleError(req, res, error);
    });
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateUser,
};
