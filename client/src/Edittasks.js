import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Todolist.css";

function Edittasks() {
  const { id } = useParams(); // Get the task ID from the URL
  console.log(id);
  const navigate = useNavigate();
  const [taskdata, settaskData] = useState({
    name: "",
    description: "",
    completed: false,
  });

  // Fetch task details when component mounts
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/tasks/${id}`
        );
        settaskData(response.data); // Pre-fill the form with fetched task data
      } catch (err) {
        console.log("Error fetching task", err);
      }
    };
    fetchTask();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    settaskData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value, // Special handling for checkbox
    }));
  };

  // Handle form submission to update the task
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/api/v1/${id}`, taskdata); // Use your existing update logic
      console.log("Task updated successfully");
      navigate("/"); // Redirect back to the task list after editing
    } catch (err) {
      console.log("Error updating task", err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="main">
        <h2>Edit Task</h2>
        <input
          type="text"
          name="name"
          placeholder="Task name"
          value={taskdata.name}
          onChange={handleChange}
          className="taskname"
        />
        <textarea
          name="description"
          rows="4"
          cols="50"
          value={taskdata.description}
          onChange={handleChange}
        />
        <input
          type="checkbox"
          name="completed"
          checked={taskdata.completed}
          onChange={handleChange}
        ></input>
        <button type="submit" id="crbtn">
          Update
        </button>
      </form>
    </div>
  );
}

export default Edittasks;
