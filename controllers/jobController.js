import { jobs } from "../models/jobsSchema.js";

export const postJob = function (req, res) {
    
    if (!req.body.jobTitle || !req.body.jobId || !req.body.jobDesc || !req.body.jobPostedBy) {
      console.log(req.body);
      res.status(400).json({success: false, message: 'Please enter mandatory fields.'});
    } else {
      
        jobs.findOne({ jobId: req.body.jobId }, function (error, resExist) {
        if (error) {
          return res.json(error)
        }
  
        if(resExist && resExist.jobId) {
         return res.status(400).json({success: false, message: 'This job already exist by same id.'});
        }
        var newJob = new jobs({
          jobPostedBy: req.body.jobPostedBy,
          jobTitle:    req.body.jobTitle,
          jobId:       req.body.jobId,
          reqExp:      req.body.reqExp,
          location:    req.body.location,
          offerSalary: req.body.offerSalary,
          keySkills:   req.body.keySkills,
          desiredProf: req.body.desiredProf,
          jobDesc:     req.body.jobDesc,
          companyProf: req.body.companyProf,
          created_at:  new Date(),
          updated_at:  ""
        });
      
        newJob.save(function (err,jobRes) {
          if (err) {
            return res.json(err)
          }
          console.log(req.body);
          res.status(200).json({success: true, message: 'Successfully created new job.', body:jobRes});
        });
      });
      
    }
  }