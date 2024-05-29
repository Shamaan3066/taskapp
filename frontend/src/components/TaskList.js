// TaskList.js

import React, { useEffect, useState } from "react";
import axios from 'axios';
import { taskApi } from "../utils/ApiRequest";
import TaskItem from "./TaskItem";
import './components.css'; // Importing components.css for styling

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('userId'));
        if (!userData || !userData._id) {
          setError("User ID not found in localStorage");
          return;
        }
        const userId = userData._id;
        const response = await axios.post(`${taskApi}/fetch`, { userId });
        if (response.data.success) {
          setTasks(response.data.tasks);
          setError(null);
        } else {
          setError(response.data.message || "Failed to fetch tasks");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskDeleted = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
  };

  return (
    <div className="task-list-container"> {/* Added class name for styling */}
      <h2>Task List</h2>
      <ul>
        {tasks.map(task => (
          <TaskItem key={task._id} task={task} onTaskDeleted={handleTaskDeleted} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
