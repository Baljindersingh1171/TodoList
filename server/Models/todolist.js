const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});
const todolist = mongoose.model("todolist", taskSchema, "tasks");
module.exports = todolist;
