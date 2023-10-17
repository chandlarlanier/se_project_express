const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { handleError } = require("../utils/errors");

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  User.findOne({ email }).then((data) => {
    if (data) {
      //need to update error code
      return res.status(409).send({ message: "Email already exists" });
    }
    return bcrypt.hash(password, 10).then((hash) => {
      User.create({ name, avatar, email, password: hash }).then((user) => {
        res.send({
          data: {
            _id: user._id,
            name: user.name,
            avatar: user.avatar,
            email: user.email,
          },
        });
      }).catch((e) => {
        handleError(req, res, e);
      });
    });
  });

  // User.create({ name, avatar })
  //   .then((user) => {
  //     res.send(user);
  //   })
  //   .catch((error) => {
  //     handleError(req, res, error);
  //   });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((error) => {
      handleError(req, res, error);
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      handleError(req, res, error);
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
};
