const User = require("../models/user");
const {SERVER_ERROR, BAD_REQUEST_ERROR, NOT_FOUND_ERROR } = require('../utils/errors');

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (message) {
    res.status(SERVER_ERROR).json({message: "Error at getUsers"});
  }
};

const getUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(NOT_FOUND_ERROR).json({message: "Invalid user"});
    }
    return res.json(user);
  } catch (e) {
    if (e.name === "CastError") {
      return res.status(BAD_REQUEST_ERROR).json({message: "Invalid user ID"});
    }
    return res.status(SERVER_ERROR).json({message: "Error at getUser"});
  }
};

const createUser = async (req, res) => {
  const { name, avatar } = req.body;
  try {
    const user = await User.create({name, avatar});
    res.status(201).json(user);
  } catch (e) {
    if (e.name === "ValidationError") {
      res.status(BAD_REQUEST_ERROR).json({message: "Invalid input"});
    }
    res.status(SERVER_ERROR).json({message: "Error at createUser"});
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
};
