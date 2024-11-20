// import { jobs } from "../models/jobsSchema.js";

// export const postJob = function (req, res) {
    
//     if (!req.body.jobTitle || !req.body.jobId || !req.body.jobDesc || !req.body.jobPostedBy) {
//       console.log(req.body);
//       res.status(400).json({success: false, message: 'Please enter mandatory fields.'});
//     } else {
      
//         jobs.findOne({ jobId: req.body.jobId }, function (error, resExist) {
//         if (error) {
//           return res.json(error)
//         }
  
//         if(resExist && resExist.jobId) {
//          return res.status(400).json({success: false, message: 'This job already exist by same id.'});
//         }
//         var newJob = new jobs({
//           jobPostedBy: req.body.jobPostedBy,
//           jobTitle:    req.body.jobTitle,
//           jobId:       req.body.jobId,
//           reqExp:      req.body.reqExp,
//           location:    req.body.location,
//           offerSalary: req.body.offerSalary,
//           keySkills:   req.body.keySkills,
//           desiredProf: req.body.desiredProf,
//           jobDesc:     req.body.jobDesc,
//           companyProf: req.body.companyProf,
//           created_at:  new Date(),
//           updated_at:  ""
//         });
      
//         newJob.save(function (err,jobRes) {
//           if (err) {
//             return res.json(err)
//           }
//           console.log(req.body);
//           res.status(200).json({success: true, message: 'Successfully created new job.', body:jobRes});
//         });
//       });
      
//     }
//   }
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

// Get all jobs
exports.getAllJobs = (req, res) => {
  const sql = 'SELECT * FROM jobs';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
};

// Search for jobs by criteria
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