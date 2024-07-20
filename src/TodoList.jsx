import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [taskDate, setTaskDate] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async () => {
    if (newTask.trim() === '' || taskDate === '') return;

    try {
      await axios.post('http://localhost:5000/tasks', { text: newTask, completed: false, date: taskDate });
      setNewTask('');
      setTaskDate('');
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const removeTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error removing task:', error);
    }
  };

  const toggleTaskCompletion = async (id, completed) => {
    try {
      await axios.put(`http://localhost:5000/tasks/${id}`, { completed: !completed });
      fetchTasks();
    } catch (error) {
      console.error('Error toggling task completion:', error);
    }
  };

  // Sort tasks by date
  const sortedTasks = [...tasks].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter a new task"
      />
      <input
        type="date"
        value={taskDate}
        onChange={(e) => setTaskDate(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {sortedTasks.map((task) => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <span onClick={() => toggleTaskCompletion(task.id, task.completed)}>
              {task.text} - {task.date}
            </span>
            <button onClick={() => removeTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
