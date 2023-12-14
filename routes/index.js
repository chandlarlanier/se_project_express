const router = require("express").Router();
const clothingItem = require("./clothingItems");
const user = require("./users");
const { login, createUser } = require("../controllers/users");
const { NotFoundError } = require("../utils/errors");

router.use("/items", clothingItem);
router.use("/users", user);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

router.post("/signin", login);
router.post("/signup", createUser);

router.use("*", (req, res, next) => {
  next(new NotFoundError("Resource not found"));
});

module.exports = router;
