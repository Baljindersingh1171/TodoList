const express = require("express");
const router = express.Router();
const {
  addTask,
  deleteTask,
  updateTask,
  getTasks,
  getTaskById,
} = require("../Controllers/Tasksoper");
router.post("/addtask", addTask);
router.get("/tasks", getTasks);
router.get("/tasks/:id", getTaskById);
router.delete("/:id", deleteTask);
router.patch("/:id", updateTask);

module.exports = router;
