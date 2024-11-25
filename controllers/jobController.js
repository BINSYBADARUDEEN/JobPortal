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

// Update a job
exports.updateJob = (req, res) => {
  const { id } = req.params;
  const { title, description, company, location, salary } = req.body;
  const sql = 'UPDATE jobs SET title = ?, description = ?, company = ?, location = ?, salary = ? WHERE id = ?';
  db.query(sql, [title, description, company, location, salary, id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Job updated successfully' });
  });
};
//to get all jobs from db
exports.getAllJobs = (req, res) => {
  const sql = 'SELECT * FROM jobs';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
};
//to delete a job
exports.deleteJob = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM jobs WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).send(err);

    if (result.affectedRows === 0) {
      return res.status(404).send({ message: 'Job not found' });
    }

    res.send({ message: 'Job deleted successfully' });
  });
};