import mongoose from "mongoose";

export const connectDB =  async()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/database")
        console.log("mongoDB is connected")

    }catch(e){
        console.log(e)
    }
}