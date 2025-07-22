import mongoose from "mongoose";

export const connectDB = async ()=>{
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI);
    } catch (error) {
        console.log("Error in mongodb connection:",error);
    }
}

