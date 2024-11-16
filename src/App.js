import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./styles.css";

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [editTask, setEditTask] = useState(null);
  const [searchPriority, setSearchPriority] = useState("All");
  const [filterCompletion, setFilterCompletion] = useState("All");

  // Save tasks to localStorage on every update
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    if (!task.dueDate || !task.priority) {
      alert("Please fill in all the fields.");
      return;
    }

    if (editTask) {
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? task : t))
      );
      setEditTask(null);
    } else {
      setTasks((prev) => [
        ...prev,
        { ...task, id: Date.now(), completed: false },
      ]);
    }
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleEdit = (task) => {
    setEditTask(task);
  };

  const toggleTaskCompletion = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filterTasks = () => {
    let filteredTasks = [...tasks];
    
    // Ensure priority filter is applied correctly
    if (searchPriority !== "All") {
      filteredTasks = filteredTasks.filter(
        (task) => task.priority && task.priority.toLowerCase() === searchPriority.toLowerCase()
      );
    }
  
    // Ensure completion filter is applied correctly
    if (filterCompletion === "Completed") {
      filteredTasks = filteredTasks.filter((task) => task.completed);
    } else if (filterCompletion === "Not Completed") {
      filteredTasks = filteredTasks.filter((task) => !task.completed);
    }
  
    return filteredTasks;
  };
  

  const getTaskSections = () => {
    const today = new Date().toISOString().split("T")[0];
    const overdue = [];
    const upcoming = [];
    const completed = [];

    filterTasks().forEach((task) => {
      if (task.completed) {
        completed.push(task);
      } else if (task.dueDate < today) {
        overdue.push(task);
      } else {
        upcoming.push(task);
      }
    });

    return { overdue, upcoming, completed };
  };

  const { overdue, upcoming, completed } = getTaskSections();

  return (
    <div className="app-container">
      <header>
        <h1>Task Manager</h1>
      </header>
      <main>
        <TaskForm
          onSave={addTask}
          initialData={editTask}
          isEditing={!!editTask}
          onCancel={() => setEditTask(null)}
        />
        <div className="filters">
          <select
            value={searchPriority}
            onChange={(e) => setSearchPriority(e.target.value)}
          >
            <option value="All">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <select
            value={filterCompletion}
            onChange={(e) => setFilterCompletion(e.target.value)}
          >
            <option value="All">All Tasks</option>
            <option value="Completed">Completed</option>
            <option value="Not Completed">Not Completed</option>
          </select>
        </div>
        <h2>Overdue Tasks</h2>
        <TaskList
          tasks={overdue}
          onEdit={handleEdit}
          onDelete={deleteTask}
          onToggleComplete={toggleTaskCompletion}
        />
        <h2>Upcoming Tasks</h2>
        <TaskList
          tasks={upcoming}
          onEdit={handleEdit}
          onDelete={deleteTask}
          onToggleComplete={toggleTaskCompletion}
        />
        <h2>Completed Tasks</h2>
        <TaskList
          tasks={completed}
          onEdit={handleEdit}
          onDelete={deleteTask}
          onToggleComplete={toggleTaskCompletion}
        />
      </main>
    </div>
  );
};

export default App;
