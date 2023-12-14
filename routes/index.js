const router = require("express").Router();
const clothingItem = require("./clothingItems");
const user = require("./users");
const { login, createUser } = require("../controllers/users");
const { ERROR_404 } = require("../utils/errors");

router.use("/items", clothingItem);
router.use("/users", user);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
}); 

router.post("/signin", login);
router.post("/signup", createUser);

router.use((req, res) => {
  res.status(ERROR_404).send({ message: "Resource does not exist" });
});

module.exports = router;
