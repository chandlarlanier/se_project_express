const ERROR_400 = 400;
const ERROR_401 = 401;
const ERROR_403 = 403;
const ERROR_404 = 404;
const ERROR_409 = 409;
const ERROR_500 = 500;

const handleError = (req, res, error) => {
  console.error(error);
  if (error.name === "ValidationError") {
    res.status(ERROR_400).send({
      message: "Invalid input",
    });
  } else if (error.name === "CastError") {
    res.status(ERROR_400).send({ message: "Invalid Id" });
  } else if (error.name === "DocumentNotFoundError") {
    res.status(ERROR_404).send({ message: "Resource not found" });
  } else {
    res.status(ERROR_500).send({ message: "Server error" });
  }
};

// New Start

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

class ConflicError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}


// New End

module.exports = {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflicError,
  ERROR_400,
  ERROR_401,
  ERROR_403,
  ERROR_404,
  ERROR_409,
  ERROR_500,
  handleError,
};
