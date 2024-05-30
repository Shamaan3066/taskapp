import React, { useEffect, useState } from "react";
import axios from 'axios';
import { taskApi } from "../utils/ApiRequest";
import TaskItem from "./TaskItem";
import { toast } from 'react-toastify';
import './components.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const userData = JSON.parse(localStorage.getItem('userId'));
        if (!userData || !userData._id) {
          setError("User ID not found in localStorage");
          toast.error("User ID not found in localStorage");
          return;
        }
        const userId = userData._id;
        const response = await axios.post(`${taskApi}/fetch`, { userId });
        if (response.data.success) {
          setTasks(response.data.tasks);
          setError(null);
        } else {
          const errorMessage = response.data.message || "Failed to fetch tasks";
          setError(errorMessage);
          toast.error(errorMessage);
        }
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskDeleted = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
  };

  return (
    <div className="task-list-container">
      <h2>Task List</h2>
      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <TaskItem key={task._id} task={task} onTaskDeleted={handleTaskDeleted} />
          ))}
        </ul>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default TaskList;
