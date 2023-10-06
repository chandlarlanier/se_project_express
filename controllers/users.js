const User = require("../models/user");
const { handleError } = require("../utils/errors");

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => {
      res.send(user);
    })
    .catch((e) => {
      handleError(req, res, e);
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((e) => {
      handleError(req, res, e);
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((e) => {
      handleError(req, res, e);
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
};
