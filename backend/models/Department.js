import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  campusId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "campus",
      required: true,
    },
  date: {
    type: String,
    default: Date(),
  },
});

export default mongoose.model("department", departmentSchema);