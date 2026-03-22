import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_DB_URL);
        console.log(`Connected to MongoDB : ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error in Mongoose Connection ${error}`);
    }
} 