const User = require("../models/user");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((e) => {
      res.status(500).send({ message: "Error from getAllUsers", e });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(204).send(user))
    .catch((e) => {
      res.status(500).send({ message: "Error from getUser", e });
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((e) => {
      res.status(500).send({ message: "Error from createUser", e });
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
};
