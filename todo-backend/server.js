// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const db = require('./db');
const tasksRouter = require('./routes/tasks');

app.use(cors());
app.use(bodyParser.json());
app.use('/tasks', tasksRouter);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
