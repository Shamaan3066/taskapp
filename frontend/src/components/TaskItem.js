// TaskItem.js
import React, { useState } from 'react';
import axios from 'axios';
import { taskApi } from '../utils/ApiRequest';
import { toast } from 'react-toastify';
import './components.css';

const TaskItem = ({ task, onTaskDeleted }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleEdit = async () => {
    try {
      await axios.put(`${taskApi}/${task._id}`, {
        title: editedTitle,
        description: editedDescription,
      });
      setEditMode(false);
      toast.success('Task updated successfully!');
      window.location.reload();
    } catch (error) {
      toast.error(`Error updating task: ${error.message}`);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${taskApi}/${task._id}`);
      onTaskDeleted(task._id);
      toast.success('Task deleted successfully!');
    } catch (error) {
      toast.error(`Error deleting task: ${error.message}`);
    }
  };

  const handleCheckboxChange = async (e) => {
    const newCompletedStatus = e.target.checked;
    try {
      await axios.put(`${taskApi}/${task._id}`, {
        completed: newCompletedStatus,
      });
      toast.success('Task status updated!');
      window.location.reload();
    } catch (error) {
      toast.error(`Error updating task: ${error.message}`);
    }
  };

  return (
    <div className="task-item">
      {!editMode ? (
        <>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleCheckboxChange}
          />
          <span>{task.title}</span>
          <p>------ {task.description}</p>
          <button onClick={() => setEditMode(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      ) : (
        <div>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <button onClick={handleEdit}>Save</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
