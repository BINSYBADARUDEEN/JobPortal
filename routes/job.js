const express = require('express');
const router = express.Router();
const jobController =  require('../controllers/jobController');

// Create a new job
router.post('/jobs', jobController.createJob);

// Update a job
router.put('/jobs/:id', jobController.updateJob);

// Get all jobs
router.get('/jobs', jobController.getAllJobs);

// Search for jobs by criteria
router.get('/jobs/search', jobController.searchJob);


module.exports = router;