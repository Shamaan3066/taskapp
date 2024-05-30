// TaskForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { taskApi } from '../utils/ApiRequest';
import { toast } from 'react-toastify';
import './components.css';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = JSON.parse(localStorage.getItem('userId'));
      const userId = userData._id;
      await axios.post(`${taskApi}`, { title, description, userId });
      setTitle('');
      setDescription('');
      toast.success('Task added successfully!');
      window.location.reload();
    } catch (error) {
      toast.error(`Error adding task: ${error.message}`);
    }
  };

  return (
    <div className="task-form-container">
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
