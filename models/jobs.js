import mongoose  from "mongoose";
var Schema = mongoose.Schema;

var jobPostSchema = new Schema({
    jobPostedBy: {
        type: String
    },
    jobTitle:{
        type: String
    },
    jobId:{
        type: String
    },
    reqExp:{
        type: String
    },
    location:{
        type: String
    },
    offerSalary:{
        type: String
    },
    keySkill:{
        type: Array
    },
    desiredProf:{
        type: String
    },
    jobDescription:{
        type: String
    },
    companyProfile:{
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    }
});

var Job = mongoose.model('jobs',jobPostSchema)

module.exports = Job;