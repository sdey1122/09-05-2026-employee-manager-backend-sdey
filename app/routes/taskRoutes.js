const express = require("express");
const router = express.Router();

const taskController = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

//create task
router.post(
  "/",
  authMiddleware,
  authorizeRoles("admin", "manager"),
  taskController.createTask,
);

//get all tasks
router.get(
  "/",
  authMiddleware,
  authorizeRoles("admin", "manager", "employee"),
  taskController.getAllTasks,
);

//get one tasks
router.get(
  "/:id",
  authMiddleware,
  authorizeRoles("admin", "manager", "employee"),
  taskController.getTaskById,
);

//update tasks
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("admin", "manager"),
  taskController.updateTask,
);

//delete tasks
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  taskController.deleteTask,
);

//change tasks status
router.patch(
  "/status/:id",
  authMiddleware,
  authorizeRoles("admin", "manager", "employee"),
  taskController.changeTaskStatus,
);

//assign a task
router.patch(
  "/assign/:id",
  authMiddleware,
  authorizeRoles("admin", "manager"),
  taskController.assignTask,
);

module.exports = router;
