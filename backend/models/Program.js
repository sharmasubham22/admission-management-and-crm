import mongoose from "mongoose";

const programSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "department",
      required: true,
    },

    intake: {
      type: Number,
      required: true,
    },

    courseType: {
      type: String,
      enum: ["Bachelors", "Masters", "PhD"],
      required: true,
    },

    entryType: {
      type: String,
      enum: ["Regular", "Lateral"],
      required: true,
    },

    date: {
      type: String,
      default: Date(),
    },
  }
);

export default mongoose.model("program", programSchema);
