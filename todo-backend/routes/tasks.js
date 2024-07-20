// routes/tasks.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all tasks
router.get('/', (req, res) => {
  db.all('SELECT * FROM tasks ORDER BY date ASC', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Add a new task
router.post('/', (req, res) => {
  const { text, completed, date } = req.body;
  db.run(
    'INSERT INTO tasks (text, completed, date) VALUES (?, ?, ?)',
    [text, completed, date],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID });
    }
  );
});

// Update a task
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { text, completed, date } = req.body;
  db.run(
    'UPDATE tasks SET text = ?, completed = ?, date = ? WHERE id = ?',
    [text, completed, date, id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ changes: this.changes });
    }
  );
});

// Delete a task
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM tasks WHERE id = ?', id, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ changes: this.changes });
  });
});

module.exports = router;
