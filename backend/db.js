import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoURI = process.env.MONGO_URI;

let isConnected = false;

const connectToMongo = async () => {
  if (isConnected) return;

  if (!mongoURI) {
    const err = new Error(
      "MONGO_URI is not set. Please define MONGO_URI in your .env file or environment variables."
    );
    console.error(err.message);
    throw err;
  }

  try {
    const db = await mongoose.connect(mongoURI);
    isConnected = Boolean(db.connections?.[0]?.readyState);
    console.log("Connected to Database");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err.message);
    throw err;
  }
};

export default connectToMongo;