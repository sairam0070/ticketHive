import mongoose from "mongoose";

const MONGO_URI = "mongodb://127.0.0.1:27017/tickethive";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error", err);
    process.exit(1);
  }
};
