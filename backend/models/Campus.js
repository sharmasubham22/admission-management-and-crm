import mongoose from "mongoose";

const campusSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  institutionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "institution",
      required: true,
    },
  date: {
    type: String,
    default: Date(),
  },
});

export default mongoose.model("campus", campusSchema);