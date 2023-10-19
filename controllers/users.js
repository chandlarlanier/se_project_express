const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { handleError, ERROR_401 } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  User.findOne({ email }).then((data) => {
    if (data) {
      //need to update error code
      return res.status(409).send({ message: "Email already exists" });
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
        .catch((e) => {
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
    .catch((e) => {
      return res.status(ERR_401).send({ message: "Login failed" });
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  login
};
