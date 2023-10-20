const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../utils/config");
const { ERROR_401 } = require("../utils/errors");

const authorize = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(ERROR_401).send({ message: "Authorization error" });
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(ERROR_401).send({ message: "Authorization error" });
  }

  req.user = payload;
  return next();
};

module.exports = authorize;
