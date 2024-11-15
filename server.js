const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const app = express();

app.use(cors());
app.use(express.json());

// In-memory task storage
let tasks = [];

// Routes
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const task = { id: uuidv4(), ...req.body, completed: false };
  tasks.push(task);
  res.status(201).json(task);
});

app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex(task => task.id === id);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...req.body };
    res.json(tasks[index]);
  } else {
    res.status(404).send("Task not found");
  }
});

app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter(task => task.id !== id);
  res.status(204).send();
});

//server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
