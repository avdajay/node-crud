const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Create a new user
router.post('/users', (req, res) => {
  let user = { name: req.body.name, email: req.body.email };
  let sql = 'INSERT INTO users SET ?';
  db.query(sql, user, (err, result) => {
    if (err) throw err;
    res.send('User added...');
  });
});

// Get all users
router.get('/users', (req, res) => {
  let sql = 'SELECT * FROM users';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Update a user
router.patch('/users/:id', (req, res) => {
  let newName = req.body.name;
  let sql = `UPDATE users SET name = ? WHERE id = ?`;
  db.query(sql, [newName, req.params.id], (err, result) => {
    if (err) throw err;
    res.send('User updated...');
  });
});

// Delete a user
router.delete('/users/:id', (req, res) => {
  let sql = `DELETE FROM users WHERE id = ?`;
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send('User deleted...');
  });
});

module.exports = router;