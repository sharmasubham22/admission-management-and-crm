import mongoose from "mongoose";

const institutionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: Date(),
  },
});

export default mongoose.model("institution", institutionSchema);