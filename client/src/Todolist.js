import { useState, useEffect } from "react";
import axios from "axios";
import Edittasks from "./Edittasks";
import "./Todolist.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Todolist() {
  const [taskdata, settaskData] = useState({
    name: "",
    description: "",
  });
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingTasks, setFetchingTasks] = useState(true);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    settaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(value);
  };

  // Add new task
  const addTask = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/addtask",
        taskdata
      );
      toast.dismiss();
      toast.success("Task is created successfully");

      settaskData({
        name: "",
        description: "",
      });
      await getTasks();
    } catch (err) {
      console.error("Error in creating task", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all tasks
  const getTasks = async () => {
    setFetchingTasks(true);
    try {
      const response = await axios.get("http://localhost:5000/api/v1/tasks");
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setFetchingTasks(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!taskdata.name || !taskdata.description) {
      toast.dismiss();
      toast.error("All fields are required");
      return;
    }

    await addTask();
  };

  // Delete task
  const handleClick = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  // Handle checkbox toggle for task completion
  const handleCheckbox = async (id, e) => {
    try {
      const updatedTask = { ...tasks.find((task) => task._id === id) };
      updatedTask.completed = e.target.checked;

      // Update task in the state instead of re-fetching all tasks
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, completed: e.target.checked } : task
        )
      );
      await axios.patch(`http://localhost:5000/api/v1/${id}`, updatedTask);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch tasks on component mount
  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit} className="main">
        <h2>TODO-APP</h2>
        <input
          className="taskname"
          type="text"
          name="name"
          placeholder="Task name"
          value={taskdata.name}
          onChange={handleChange}
          disabled={loading}
        ></input>
        <textarea
          name="description"
          rows="7"
          cols="50"
          onChange={handleChange}
          placeholder="Task description"
          value={taskdata.description}
          disabled={loading}
        ></textarea>

        <button id="crbtn" disabled={loading}>
          {loading ? "creating...." : "create"}
        </button>
      </form>

      <div className="tasks">
        {fetchingTasks ? (
          <p>Loading tasks..</p>
        ) : tasks.length > 0 ? (
          tasks.map((task) => (
            <p key={task._id} className="content">
              <span
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                {task.name}: {task.description}
              </span>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={(e) => handleCheckbox(task._id, e)}
              />
              <Link to={`/tasks/edit/${task._id}`}>
                <button id="edtbtn">Edit</button>
              </Link>
              <button onClick={() => handleClick(task._id)} id="delbtn">
                DELETE
              </button>

              <div>
                {task.completed ? (
                  <p style={{ color: "green" }}>completed</p>
                ) : (
                  <p style={{ color: "red" }}>uncompleted</p>
                )}
              </div>
            </p>
          ))
        ) : (
          <p>No tasks available</p>
        )}
      </div>
    </>
  );
}

export default Todolist;
