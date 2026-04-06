import mongoose from "mongoose";
import { env } from "./env";

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(env.MONGODB_URL);
    console.log("🚀 Connected to MongoDB");
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};
