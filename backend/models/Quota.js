import mongoose from "mongoose";

const quotaSchema = new mongoose.Schema(
  {
    programId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "program",
      required: true,
    },

    type: {
      type: String,
      enum: ["KCET", "COMEDK", "Management"],
      required: true,
    },

    totalSeats: {
      type: Number,
      required: true,
    },

    filledSeats: {
      type: Number,
      default: 0,
    },

    date: {
      type: String,
      default: Date(),
    },
  }
);

export default mongoose.model("Quota", quotaSchema);
