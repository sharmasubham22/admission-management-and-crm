import Institutions from "../models/Institution.js";
import Campus from "../models/Campus.js";
import Department from "../models/Department.js";
import Programs from "../models/Program.js";

// Institution Controllers
export const createInstitution = async (req, res) => {
  try {
    const institution = await Institutions.create(req.body);
    res.status(201).json(institution);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getInstitutions = async (req, res) => {
  const institutions = await Institutions.find();
  res.json(institutions);
};

export const getInstitutionById = async (req, res) => {
  const institution = await Institutions.findById(req.params.id);
  res.json(institution);
};

// Campus Controllers
export const createCampus = async (req, res) => {
  try {
    const campus = await Campus.create(req.body);
    res.status(201).json(campus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Department Controllers
export const createDepartment = async (req, res) => {
  try {
    const department = await Department.create(req.body);
    res.status(201).json(department);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Program Controllers
export const createProgram = async (req, res) => {
  try {
    const program = await Programs.create(req.body);
    res.status(201).json(program);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

