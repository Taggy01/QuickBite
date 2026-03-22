import express from "express";
import "dotenv/config";

import homeRouter from "./routes/homeRoute.js";
import authRouter from "./routes/authRoute.js";
import { connectDB } from "./utils/mongoose.js";

const app = express();

app.use("/api/homepage" , homeRouter);
app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log("Server is Started.");
    connectDB();
})