import Institutions from "../models/Institution.js";
import Campus from "../models/Campus.js";
import Department from "../models/Department.js";
import Programs from "../models/Program.js";
import Quota from "../models/Quota.js";

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

export const getCampuses = async (req, res) => {
  try {
    const campuses = await Campus.find().populate('institutionId');
    res.json(campuses);
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

export const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find().populate("campusId");
    res.json(departments);
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

export const getPrograms = async (req, res) => {
  try {
    const programs = await Programs.find().populate('departmentId');
    res.json(programs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Quota Controllers
export const createQuota = async (req, res) => {
  try {
    const quota = await Quota.create(req.body);
    res.status(201).json(quota);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getQuotas = async (req, res) => {
  try {
    const quotas = await Quota.find()
      .populate("programId")
      .populate({
        path: "programId",
        populate: {
          path: "departmentId",
          populate: {
            path: "campusId",
            populate: {
              path: "institutionId",
            },
          },
        },
      });
    res.json(quotas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

