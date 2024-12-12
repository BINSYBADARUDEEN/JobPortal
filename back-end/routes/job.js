var express = require('express');
var router = express.Router();
var jobController = require('../controllers/jobController');
//api for create job
router.post('/jobs', jobController.createJob);

//api for update job
router.put('/jobs/:id', jobController.updateJob);

//api for getting all jobs
router.get('/jobs', jobController.getAllJobs);

//api for searching the job data by JobTitle keyword
router.get('/jobs/search', jobController.searchJob);

//api for deleting the job
router.delete('/jobs/:id', jobController.deleteJob);

//api for getting job with id
router.get('/jobs/:id', jobController.getJobById);

module.exports = router;