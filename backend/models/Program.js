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

    academicYear: {
      type: String,
      required: true,
    },

    courseType: {
      type: String,
      required: true,
    },

    entryType: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      default: Date(),
    },
  }
);

export default mongoose.model("program", programSchema);
