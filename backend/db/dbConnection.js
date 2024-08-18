import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URL,{
        dbName:"VLIB_DB"
    }).then(() => {
        console.log("Connected to DB");
    }).catch((err)=>{
        console.log(`Error connecting to DB ${err}`);
    })
}