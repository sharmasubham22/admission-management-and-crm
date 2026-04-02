import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoURI = process.env.MONGO_URI;

let isConnected = false;

const connectToMongo = async () => {
  if (isConnected) return;
  const db = await mongoose.connect(mongoURI);
  isConnected = db.connections[0].readyState;
  console.log("Connected to Database")
};

export default connectToMongo;