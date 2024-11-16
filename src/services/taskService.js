// Helper functions to interact with local storage
export const fetchTasks = () => {
    return JSON.parse(localStorage.getItem('tasksData')) || [];
  };
  
  export const saveTasks = (tasks) => {
    localStorage.setItem('tasksData', JSON.stringify(tasks));
  };
  
  export const addTask = (task) => {
    const tasks = fetchTasks();
    tasks.push(task);
    saveTasks(tasks);
  };
  
  export const updateTask = (updatedTask) => {
    const tasks = fetchTasks();
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    saveTasks(updatedTasks);
  };
  
  export const deleteTask = (taskId) => {
    const tasks = fetchTasks();
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    saveTasks(updatedTasks);
  };
  