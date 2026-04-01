import express from "express";
import cookieParser from 'cookie-parser';
import "dotenv/config";

import foodRouter from "./routes/foodRoute.js";
// import authRouter from "./routes/authRoute.js";
import { connectDB } from "./utils/mongoose.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/food" , foodRouter);
// app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is Started at ${PORT}.`);
    connectDB();
})