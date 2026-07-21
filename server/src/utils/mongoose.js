import mongoose from "mongoose";
import dns from "dns";

dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_DB_URL);
        console.log(`Connected to MongoDB : ${conn.connection.host}`);
    } catch (error) {
        console.log("Error in Mongoose Connection ", error);
    }
} 