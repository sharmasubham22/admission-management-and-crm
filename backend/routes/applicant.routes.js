import express from "express";
import { createApplicant, getApplicants, getApplicantById, allotSeat, updateDocStatus } from "../controllers/ApplicantControllers.js";

const router = express.Router();

router.post("/add-applicant", createApplicant);
router.get("/applicants", getApplicants);
router.get("/applicant-details/:id", getApplicantById);
router.post("/allot-seat", allotSeat);
router.patch("/update-doc-status/:id", updateDocStatus);

export default router;
