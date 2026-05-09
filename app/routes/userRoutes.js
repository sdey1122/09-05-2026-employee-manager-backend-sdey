const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMiddleware");

//create user
router.post(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  upload.single("avatar"),
  userController.createUser,
);

//get all users
router.get(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  userController.getAllUsers,
);

//get one user
router.get(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  userController.getUserById,
);

//update user
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  userController.updateUser,
);

//delete user
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  userController.deleteUser,
);

//change status
router.patch(
  "/status/:id",
  authMiddleware,
  authorizeRoles("admin"),
  userController.changeStatus,
);

module.exports = router;
