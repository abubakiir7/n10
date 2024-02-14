const { Router } = require("express");
const {
  addUser,
  getUsers,
  getUserById,
  deleteUserById,
  updateUserById,
  getUserByName
} = require("../controllers/user.controller");

const router = Router();

router.post("/", addUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.get("/name/:name", getUserByName);
router.delete("/:id", deleteUserById);
router.put("/:id", updateUserById);

module.exports = router;
