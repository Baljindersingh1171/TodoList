const todolist = require("../Models/todolist");

const addTask = async (req, res) => {
  const { name, description, dueDate } = req.body;
  console.log(name);
  if (!name || !description) {
    return res.status(400).json({ msg: "All field are required" });
  }

  try {
    const newtask = await todolist.create({
      name: name,
      description: description,
    });
    res.status(201).json({
      message: "Task added succesfully",
      task: newtask,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error adding task",
      error: err.message,
    });
  }
};
const getTasks = async (req, res) => {
  try {
    const tasks = await todolist.find();
    res.status(200).json(tasks);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching tasks", error: err.message });
  }
};
// Controller: Get a single task by its ID
const getTaskById = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await todolist.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching task",
      error: err.message,
    });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteTask = await todolist.findByIdAndDelete(id);
    console.log(deleteTask.completed);
    if (!deleteTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({
      message: "Task deleted successfully",
      task: deleteTask,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting task",
      error: err.message,
    });
  }
};
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { name, description, completed } = req.body;

  try {
    const taskToUpdate = await todolist.findById(id);
    if (!taskToUpdate) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (name) taskToUpdate.name = name;
    if (description) taskToUpdate.description = description;
    if (completed !== undefined) taskToUpdate.completed = completed;

    await taskToUpdate.save();
    res.status(200).json({
      message: "Task updated successfully",
      task: taskToUpdate,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error updating task",
      error: err.message,
    });
  }
};

module.exports = { getTaskById, getTasks, addTask, deleteTask, updateTask };
