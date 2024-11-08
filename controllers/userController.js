
import ErrorHandler from "../middleware/error.js";
import { user } from "../models/userSchema.js";

export const register = async(req,res,next) => {
    try{
        const {
            name,
            email,
            phone,
            address,
            password,
            role,
            firstNiche,
            secndNiche,
            thirdNiche,
            coverLetter,
        } = req.body;
        if(!name || !email || !phone || !address || !password || !role){
            return next(new ErrorHandler("All fieldsare required",400));
        }
        if(role === "Job Seeker" && (!firstNiche || !secondNiche || !thirdNiche)){
            return next(new ErrorHandler("Please provide your prefered job niche", 400))
        }
        const existingUser = await user.findOne({email});
        if(existingUser){
            return next(new ErrorHandler("Email is already registered", 400));
        }
        const userData = {
            name,
            email,
            phone,
            address,
            password,
            role,
            niches: {
                firstNiche,
                secndNiche,
                thirdNiche,
            },
            coverLetter,
        };


    }catch (error){

    }
}; 