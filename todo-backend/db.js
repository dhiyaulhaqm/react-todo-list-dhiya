// db.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./todo.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    completed BOOLEAN NOT NULL,
    date TEXT NOT NULL
  )`);
});

module.exports = db;
