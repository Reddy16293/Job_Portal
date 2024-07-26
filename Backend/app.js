import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import 'express-async-errors'; // Import express-async-errors
import dbConnect from "./database/dbConnect.js";
import { userRouter, jobRouter, applicationRouter } from "./routes/index.js";
import { errorMiddleware } from "./middlewares/error.js";

dotenv.config({ path: "./config/config.env" });

const app = express();

// Initialize database connection
await dbConnect();

// Middlewares
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "./tmp/"
}));

// Routes
app.use('/api/user/v1', userRouter);
app.use('/api/v1', applicationRouter);
app.use('/api/v1', jobRouter);

// Root Route
app.get("/", (req, res) => {
    res.send("Welcome to Node.js and Express API!");
});

// Error Middleware
app.use(errorMiddleware);
app.use((err,req,res,next)=>{
    console.log("err" ,err);
    res.status(500).json({error:err.message});
});
export default app;
