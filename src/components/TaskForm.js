import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSave, initialData = null, isEditing, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Medium', // Default priority level
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        dueDate: initialData.dueDate || '',
        priority: initialData.priority || 'Medium',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, id: initialData?.id || Date.now() });
    setFormData({
      title: '',
      description: '',
      dueDate: '',
      priority: 'Medium',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEditing ? 'Edit Task' : 'Add New Task'}</h2>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Due Date:</label>
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Priority:</label>
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      <button type="submit">{isEditing ? 'Update Task' : 'Add Task'}</button>
      {isEditing && <button onClick={onCancel}>Cancel</button>}
    </form>
  );
};

export default TaskForm;
