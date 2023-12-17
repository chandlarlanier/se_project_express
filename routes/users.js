const router = require("express").Router();
const { getCurrentUser, updateUser } = require("../controllers/users");
const { authorize } = require("../middlewares/auth");
const { validateUserInfo } = require("../middlewares/validation");

router.get("/me", authorize, getCurrentUser);
router.patch("/me", authorize, validateUserInfo, updateUser);

module.exports = router;
