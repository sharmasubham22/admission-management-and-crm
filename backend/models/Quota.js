import mongoose from "mongoose";

const quotaSchema = new mongoose.Schema(
  {
    programId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "program",
      required: true,
    },

    totalSeats: {
      type: Number,
      required: true,
    },

    kcet: {
      type: Number,
      default: 0,
    },

    filledKcet: {
      type: Number,
      default: 0,
    },

    comedk: {
      type: Number,
      default: 0,
    },

    filledComedk: {
      type: Number,
      default: 0,
    },

    management: {
      type: Number,
      default: 0,
    },

    filledManagement: {
      type: Number,
      default: 0,
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
