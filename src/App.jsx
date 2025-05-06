import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import ChartComponent from './components/ChartComponent';
import { format } from 'date-fns';
import { Home } from 'lucide-react';

function App() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask) => {
    setTasks([...tasks, { id: Date.now(), title: newTask, completed: false, createdAt: new Date() }]);
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const completedTasksCount = tasks.filter(task => task.completed).length;
  const pendingTasksCount = tasks.filter(task => !task.completed).length;

  const chartData = {
    labels: ['Completed', 'Pending'],
    datasets: [
      {
        label: 'Task Status',
        data: [completedTasksCount, pendingTasksCount],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 to-blue-100 flex flex-col items-center justify-start p-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2 flex items-center justify-center">
          <Home className="mr-2 text-blue-500" size={32} />
          My Fantastic To-Do List <span role="img" aria-label="sparkles">✨</span>
        </h1>
        <p className="text-gray-600">Get organized and stay productive!</p>
      </header>

      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-3xl flex flex-col">
        <TaskForm addTask={addTask} />
        <TaskList tasks={tasks} toggleComplete={toggleComplete} deleteTask={deleteTask} />
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Task Completion Overview</h2>
          <ChartComponent chartData={chartData} />
        </div>
      </div>

      <footer className="mt-8 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} To-Do App. All rights reserved. Made with ❤️</p>
      </footer>
    </div>
  );
}

export default App;
