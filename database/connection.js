import e from "cors";
import mongoose from "mongoose";


export const connection = () => {
    mongoose.connect(process.env.MONGO_URI,{
        dbName: "JOBPORTAL"
    }).then(() =>{
        console.log("CConnected to database")
    }).catch(err=>{
        console.log(`Some error occured while connecting to database: ${err}`)
    })
}