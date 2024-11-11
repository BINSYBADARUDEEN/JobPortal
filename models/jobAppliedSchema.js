import mongoose  from "mongoose";

var Schema = mongoose.Schema;

var jobAppliedSchema = new Schema({
    jobApplied: {
        type: String
    },
    jobAppliedBy: {
        type: String
    },
    appliedAt: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date
    }
});


var jobApplied = mongoose.model('jobApplied', jobAppliedSchema);

module.exports = jobApplied;