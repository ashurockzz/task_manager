
# Answers to Technical Questions

## 1. How long did you spend on the coding test?

I spent approximately 6-7 hours on the coding test, which involved implementing and optimizing a task management application with filtering, task categorization, and persistent storage using `localStorage`. The focus was on React and frontend development.

## 2. What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.

The most useful feature added to React (my chosen framework for this project) was **React Hooks**. Hooks allow us to use state and other React features without writing a class-based component. Specifically, the `useState` and `useEffect` hooks were invaluable for managing the state and persisting tasks in `localStorage`.

### Code snippet:

```js
import React, { useState, useEffect } from "react";

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // Save tasks to localStorage on every update
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="app-container">
      <h1>Task Manager</h1>
      {/* Other components and logic */}
    </div>
  );
};

export default App;
```

In this example, the `useState` hook is used to initialize the state with tasks from `localStorage`, and the `useEffect` hook updates `localStorage` whenever the tasks state changes.

## 3. How would you track down a performance issue in production? Have you ever had to do this?

To track down a performance issue in production, I would follow these steps:

1. **Reproduce the Issue**: If possible, try to reproduce the issue in a development or staging environment.
2. **Use Performance Profiling Tools**: I would use tools such as the **React Developer Tools**, **Chrome DevTools**, or third-party services like **New Relic** or **Datadog** to identify performance bottlenecks (e.g., slow rendering, excessive re-renders, or memory leaks).
3. **Analyze Network Traffic**: Check the network tab for slow API calls or large assets that could be affecting the page load time.
4. **Optimize Code**: Once I pinpoint the bottleneck, I would optimize the code (e.g., using React’s `useMemo`, `React.memo`, or reducing unnecessary API calls) to improve performance.

Yes, I have tracked down performance issues before. For example, in a previous project, I noticed that the page was rendering slowly due to excessive re-renders. After using React’s profiling tools, I discovered that I was not memoizing components properly, which caused unnecessary re-renders. I fixed this by using `React.memo` and `useMemo`.

## 4. If you had more time, what additional features or improvements would you consider adding to the task management application?

If I had more time, I would consider adding the following features or improvements:

- **User Authentication**: Allow users to create accounts and log in, so they can have a personalized task list.
- **Due Date Notifications**: Implement email or in-app notifications for overdue tasks(depends upon the user if the user wants to assign the task with gmail).
- **Task Sorting**: Allow users to sort tasks based on due date or priority.
- **Task Priority Customization**: Allow users to add custom priority levels or tags for tasks.
- **Improved UI/UX**: Enhance the user interface with animations, drag-and-drop task reordering, and a more polished design.
- **Backend Integration**: Move from `localStorage` to a server-side database (e.g., MongoDB or Firebase) to make the app scalable.

These additional features would improve the user experience and functionality of the task management app.
