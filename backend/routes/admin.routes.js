import express from "express";
import { createInstitution, getInstitutions, getInstitutionById, createCampus, getCampuses, createDepartment, createProgram, getPrograms, getDepartments, createQuota, getQuotas } from "../controllers/AdminControllers.js";

const router = express.Router();

router.post("/add-institutions", createInstitution);
router.get("/institutions", getInstitutions);
router.get("/institutions/:id", getInstitutionById);

router.post("/add-campus", createCampus);
router.get("/campuses", getCampuses);

router.post("/add-department", createDepartment);
router.get("/departments", getDepartments);

router.post("/add-program", createProgram);
router.get("/programs", getPrograms);

router.post("/add-quota", createQuota);
router.get("/quotas", getQuotas);

export default router;
