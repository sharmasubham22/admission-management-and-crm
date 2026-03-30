import mongoose from "mongoose";

const mongoURI =
  "mongodb+srv://subhamsharma8269:subh8269@cluster0.ksh4ase.mongodb.net/";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to Database");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

export default connectToMongo;
