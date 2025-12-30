// // src/db.ts
// import mongoose from 'mongoose';

// const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/tickethive';

// export async function connectDB() {
//     try{
//   await mongoose.connect(process.env.MONGO_URI!);
//     console.log("Mongo URL:", process.env.MONGO_URL); // 👈 ADD THIS

//   console.log("✅ MongoDB connected");
//   } catch (err) {
//     console.error('MongoDB connection error', err);
//     process.exit(1);
//   }
// };




import mongoose from "mongoose";

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://mongo:27017/tickethive";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error", err);
    process.exit(1);
  }
};

