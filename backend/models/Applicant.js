import mongoose from "mongoose";

const applicantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    contact: {
      type: Number,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    fatherName: {
      type: String,
      required: true,
    },

    motherName: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    entryType: {
      type: String,
      required: true,
    },

    marks: {
      type: Number,
      required: true,
    },

    allotmentNumber: {
      type: String,
      required: false,
    },

    programId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "program",
      required: false,
    },

    quotaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "quota",
      required: false,
    },

    quotaType: {
      type: String,
      required: false,
    },

    documentStatus: {
      type: String,
      default: "pending",
    },

    seatStatus: {
      type: String,
      default: "Not Allotted",
    },

    feeStatus: {
      type: String,
      default: "Unpaid",
    },

    admissionNumber: {
      type: String,
      required: false,
    },

    date: {
      type: String,
      default: Date(),
    },
  }
);

export default mongoose.model("applicant", applicantSchema);
