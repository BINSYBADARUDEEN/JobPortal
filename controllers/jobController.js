const db = require('../database/connection');

// Create a new job
exports.createJob = (req, res) => {
  const { title, description, company, location, salary } = req.body;
  const sql = 'INSERT INTO jobs (title, description, company, location, salary) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [title, description, company, location, salary], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send({ message: 'Job created successfully', jobId: result.insertId });
  });
};