import express from "express";
import { createInstitution, getInstitutions, getInstitutionById, createCampus } from "../controllers/AdminControllers.js";

const router = express.Router();

router.post("/add-institutions", createInstitution);
router.get("/institutions", getInstitutions);
router.get("/institutions/:id", getInstitutionById);

router.post("/add-campus", createCampus);

export default router;
