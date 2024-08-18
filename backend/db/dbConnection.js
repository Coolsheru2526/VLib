import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.connect("mongodb://localhost:27017/vlib",{
        dbName:"VLIB_DB"
    }).then(() => {
        console.log("Connected to DB");
    }).catch((err)=>{
        console.log(`Error connecting to DB ${err}`);
    })
}