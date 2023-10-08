const ERROR_400 = 400;
const ERROR_404 = 404;
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

module.exports = { ERROR_400, ERROR_404, ERROR_500, handleError };
