// TaskForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { taskApi } from '../utils/ApiRequest';
import './components.css'; // Importing components.css for styling

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = JSON.parse(localStorage.getItem('userId'));
      const userId = userData._id;
      const response = await axios.post(`${taskApi}`, { title, description, userId });
      setTitle('');
      setDescription('');
      window.location.reload();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div className="task-form-container"> {/* Added class name for styling */}
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
