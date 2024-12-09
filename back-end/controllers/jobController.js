const db = require('../database/connection');

// Create a new job
exports.createJob = (req, res) => {
  const { title, description, company, location, salary, email } = req.body;
  const sql = 'INSERT INTO jobs (title, description, company, location, salary, email) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [title, description, company, location, salary, email], (err, result) => {
    if (err) {
      console.error('Database error:', err); 
      return res.status(500).send({ message: 'Database error' });
    }
    res.status(201).send({ message: 'Job created successfully', jobId: result.insertId });
  });
};

// Update a job
exports.updateJob = (req, res) => {
  const { id } = req.params;
  const { title, description, company, location, salary, email } = req.body;
  const sql = 'UPDATE jobs SET title = ?, description = ?, company = ?, location = ?, salary = ?, email = ? WHERE id = ?';
  db.query(sql, [title, description, company, location, salary, email, id], (err, result) => {
    if (err) {
      console.error('Database error:', err); 
      return res.status(500).send({ message: 'Database error' });
    }
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
//search job with title and location
exports.searchJob = (req, res) => {
  const { title, location } = req.query;
  let sql = 'SELECT * FROM jobs WHERE 1=1';
  const params = [];
  if (title) {
    sql += ' AND title LIKE ?';
    params.push(`%${title}%`);
  }
  if (location) {
    sql += ' AND location LIKE ?';
    params.push(`%${location}%`);
  }
  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
};

// Get job by id
exports.getJobById = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM jobs WHERE id = ? ';
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Error fetching job by ID:', err);
      return res.status(500).send({ message: 'Server error' });
    }
    if (results.length === 0) {
      return res.status(404).send({ message: 'Job not found' });
    }

    res.send(results[0]);
  });
};