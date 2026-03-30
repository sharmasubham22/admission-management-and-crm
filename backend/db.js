import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoURI = process.env.MONGO_URI;

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to Database");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

export default connectToMongo;
