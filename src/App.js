// src/App.js

import React, { useState, useEffect } from 'react';
import './theme.css'; // Import CSS file untuk tema
import TodoList from './TodoList'; // Import komponen TodoList

function App() {
  // Set default theme to light
  const [theme, setTheme] = useState('light-theme');

  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light-theme' ? 'dark-theme' : 'light-theme';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); // Save theme to localStorage
  };

  return (
    <div className={theme}>
      <div className="container">
        <h1>Punya Dhiya ni Boss Syenggol Dwong!</h1>
        <button onClick={toggleTheme}>
          Switch to {theme === 'light-theme' ? 'Dark' : 'Light'} Theme
        </button>
        <TodoList />
      </div>
    </div>
  );
}

export default App;
