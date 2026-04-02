import React, { useState, useContext, useMemo } from "react";
import { AppContextAPI } from "../context/AppContext";

export default function Departments({ campus, onSelect, onBack }) {
  const { departments, addDepartment } = useContext(AppContextAPI);
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState("");

  const filteredDepartments = useMemo(() => {
    return departments.filter((d) => d.campusId?._id === campus._id);
  }, [departments, campus]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await addDepartment({
      name,
      campusId: campus._id,
    });

    if (result.success) {
      setName("");
      setShowAddModal(false);
    }
  };

  return (
    <div>
      <button onClick={onBack} className="mb-4 px-3 py-1 bg-gray-200 rounded">
        ← Back
      </button>
      <h1 className="text-3xl font-bold mb-4">Departments - {campus.name}</h1>
      <button
        className="mb-4 px-4 py-2 bg-brand text-white rounded-base hover:bg-brand-strong"
        onClick={() => setShowAddModal(true)}
      >
        Add Department
      </button>

      {showAddModal && (
        <div className="fixed inset-0 bg-background/70 flex items-center justify-center">
          <div className="bg-card border border-border p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              Add Department to {campus.name}
            </h2>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Department Name"
                className="w-full p-2 border rounded-base mb-4"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

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

      <ul>
        {filteredDepartments.length === 0 ? (
          <p className="text-gray-500">No departments found</p>
        ) : (
          filteredDepartments.map((dept) => (
            <li
              key={dept._id}
              onClick={() => onSelect(dept)} // 🔥 IMPORTANT
              className="p-3 border rounded-base mb-2 cursor-pointer hover:bg-gray-100"
            >
              <strong>{dept.name}</strong>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
