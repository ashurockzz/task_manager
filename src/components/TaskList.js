import React from 'react';

const TaskList = ({ tasks, onEdit, onDelete, onToggleComplete }) => {
  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id} className={`task ${task.priority?.toLowerCase()}`}>
          <h3>
            {task.title} ({task.priority}){' '}
            {task.completed ? <span>(Completed)</span> : ''}
          </h3>
          <p>{task.description}</p>
          <p>Due: {task.dueDate}</p>
          <button onClick={() => onEdit(task)}>Edit</button>
          <button onClick={() => onDelete(task.id)}>Delete</button>
          <button onClick={() => onToggleComplete(task.id)}>
            {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
