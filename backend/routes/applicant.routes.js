import express from "express";
import { createApplicant, getApplicants, getApplicantById, allotSeat } from "../controllers/ApplicantControllers.js";

const router = express.Router();

router.post("/add-applicant", createApplicant);
router.get("/applicants", getApplicants);
router.get("/applicant/:id", getApplicantById);
router.post("/allot-seat", allotSeat);

export default router;
