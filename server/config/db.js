import mongoose from "mongoose";

export const connectDB =  async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("mongoDB is connected")

    }catch(e){
        console.log(e)
    }
}