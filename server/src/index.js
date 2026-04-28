import express from "express";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import "dotenv/config";

import foodRouter from "./routes/foodRoute.js";
import categoryRouter from "./routes/categoryRoute.js";
// import authRouter from "./routes/authRoute.js";
import { connectDB } from "./utils/mongoose.js";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/food" , foodRouter);
app.use("/api/category" , categoryRouter);
// app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is Started at ${PORT}.`);
    connectDB();
})