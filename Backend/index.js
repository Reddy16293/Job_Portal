import express from "express";
import cloudinary from "cloudinary";
import app from "./app.js";

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_SECRET
})


app.listen(process.env.port,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})