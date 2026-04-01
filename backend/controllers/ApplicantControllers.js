import Applicant from "../models/Applicant.js";
import Quota from "../models/Quota.js";

// Applicant Controllers
export const createApplicant = async (req, res) => {
  try {
    const applicant = await Applicant.create(req.body);
    res.status(201).json(applicant);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getApplicants = async (req, res) => {
  try {
    const applicants = await Applicant.find();
    res.json(applicants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getApplicantById = async (req, res) => {
  const applicant = await Applicant.findById(req.params.id);
  res.json(applicant);
};

export const allotSeat = async (req, res) => {
  try {
    const { applicantId, programId, quotaType } = req.body;

    if (!applicantId || !programId || !quotaType) {
      return res.status(400).json({
        message: "Applicant ID, Program ID, and Quota Type are required"
      });
    }

    const validQuotaTypes = ['kcet', 'comedk', 'management'];
    if (!validQuotaTypes.includes(quotaType.toLowerCase())) {
      return res.status(400).json({
        message: "Invalid quota type. Must be kcet, comedk, or management"
      });
    }

    const quota = await Quota.findOne({ programId });

    if (!quota) {
      return res.status(404).json({ message: "Quota not found for this program" });
    }

    const applicant = await Applicant.findById(applicantId);
    if (!applicant) {
      return res.status(404).json({ message: "Applicant not found" });
    }

    if (applicant.seatStatus === "Allotted") {
      return res.status(400).json({
        message: "Seat already allocated to this applicant",
      });
    }

    const totalField = quotaType.toLowerCase();
    const filledField = "filled" + quotaType.charAt(0).toUpperCase() + quotaType.slice(1);

    const totalSeats = quota[totalField] || 0;
    const filledSeats = quota[filledField] || 0;

    if (filledSeats >= totalSeats) {
      return res.status(400).json({
        message: `${quotaType.toUpperCase()} quota is full`,
      });
    }

    quota[filledField] = filledSeats + 1;
    quota.filledSeats = (quota.filledSeats || 0) + 1;

    await quota.save();

    applicant.programId = programId;
    applicant.quotaId = quota._id;
    applicant.quotaType = quotaType.toLowerCase();
    applicant.seatStatus = "Allotted";

    await applicant.save();

    res.status(200).json({
      message: "Seat allotted successfully",
      applicant: {
        _id: applicant._id,
        name: applicant.name,
        seatStatus: applicant.seatStatus,
        programId: applicant.programId,
        quotaType: applicant.quotaType
      },
      quota: {
        _id: quota._id,
        programId: quota.programId,
        filledSeats: quota.filledSeats,
        [filledField]: quota[filledField]
      }
    });
  } catch (err) {
    console.error("Seat allot error:", err);
    res.status(500).json({ message: err.message });
  }
};