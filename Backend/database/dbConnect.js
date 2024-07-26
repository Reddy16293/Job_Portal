import mongoose from "mongoose";

const dbConnection = async () => {
    const mongoURI = process.env.MONGO_URL;
    if (!mongoURI) {
        throw new Error("MONGO_URL environment variable not set");
    }

    await mongoose.connect(mongoURI, {
        dbName: "MERN_STACK_JOB_PORTAL"
    });
    console.log("Database Connected Successfully");
};

export default dbConnection;
