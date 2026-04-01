import React, { useContext, useState, useMemo } from "react";
import { AdminContextAPI } from "../context/AdminContext";

export default function Programs({ department, onSelect, onBack }) {
  const { programs, addProgram } = useContext(AdminContextAPI);

  const [showAddModal, setShowAddModal] = useState(false);

  const [name, setName] = useState("");
  const [intake, setIntake] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [courseType, setCourseType] = useState("");
  const [entryType, setEntryType] = useState("");

  // 🔥 Filter programs by department
  const filteredPrograms = useMemo(() => {
    return programs.filter((p) => p.departmentId?._id === department._id);
  }, [programs, department]);

  // ➕ Add program
  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await addProgram({
      name,
      departmentId: department._id,
      intake,
      academicYear,
      courseType,
      entryType,
    });

    if (result.success) {
      setName("");
      setIntake("");
      setAcademicYear("");
      setCourseType("");
      setEntryType("");
      setShowAddModal(false);
    }
  };

  return (
    <div>
      {/* 🔙 Back */}
      <button onClick={onBack} className="mb-4 px-3 py-1 bg-gray-200 rounded">
        ← Back
      </button>

      {/* Header */}
      <h1 className="text-3xl font-bold mb-4">Programs - {department.name}</h1>

      {/* ➕ Add Button */}
      <button
        className="mb-4 px-4 py-2 bg-brand text-white rounded hover:bg-brand-strong"
        onClick={() => setShowAddModal(true)}
      >
        Add Program
      </button>

      {/* Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-background/70 flex items-center justify-center p-4">
          <div className="bg-card border rounded-lg w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">
              Add Program to {department.name}
            </h2>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Program Name"
                className="w-full p-2 border rounded mb-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <input
                type="number"
                placeholder="Intake"
                className="w-full p-2 border rounded mb-3"
                value={intake}
                onChange={(e) => setIntake(e.target.value)}
                required
              />

              <select
                className="w-full p-2 border rounded mb-3"
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                required
              >
                <option value="">Academic Year</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
              </select>

              <select
                className="w-full p-2 border rounded mb-3"
                value={courseType}
                onChange={(e) => setCourseType(e.target.value)}
                required
              >
                <option value="">Course Type</option>
                <option value="UG">UG</option>
                <option value="PG">PG</option>
              </select>

              <select
                className="w-full p-2 border rounded mb-4"
                value={entryType}
                onChange={(e) => setEntryType(e.target.value)}
                required
              >
                <option value="">Entry Type</option>
                <option value="Regular">Regular</option>
                <option value="Lateral">Lateral</option>
              </select>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-brand text-white rounded"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 📋 List */}
      <ul>
        {filteredPrograms.length === 0 ? (
          <p className="text-gray-500">No programs found</p>
        ) : (
          filteredPrograms.map((program) => (
            <li
              key={program._id}
              onClick={() => onSelect(program)} // 🔥 IMPORTANT
              className="p-3 border rounded mb-2 cursor-pointer hover:bg-gray-100"
            >
              <strong>{program.name}</strong> | Intake: {program.intake}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
