import React, { useContext, useEffect, useState } from "react";
import { AppContextAPI } from "../context/AppContext";

export default function SeatAllot({ applicant, onClose }) {
  const { institutions, campuses, departments, programs, quotas, allotSeat } = useContext(AppContextAPI);

  const [institutionId, setInstitutionId] = useState("");
  const [campusId, setCampusId] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [programId, setProgramId] = useState("");
  const [quotaType, setQuotaType] = useState("");

  const filteredCampuses = campuses.filter((c) => c.institutionId?._id === institutionId,);
  const filteredDepartments = departments.filter((d) => d.campusId?._id === campusId,);
  const filteredPrograms = programs.filter((p) => p.departmentId?._id === departmentId,);
  const selectedQuota = quotas.find(
    (q) => q.programId?._id === programId || q.programId === programId,
  );

  const isGovernment = applicant.entryType === "Government";

  useEffect(() => {
    if (!isGovernment && programId) {
      setQuotaType("management");
    }
  }, [isGovernment, programId]);

  const handleInstitutionChange = (id) => {
    setInstitutionId(id);
    setCampusId("");
    setDepartmentId("");
    setProgramId("");
    setQuotaType("");
  };

  const handleCampusChange = (id) => {
    setCampusId(id);
    setDepartmentId("");
    setProgramId("");
    setQuotaType("");
  };

  const handleDepartmentChange = (id) => {
    setDepartmentId(id);
    setProgramId("");
    setQuotaType("");
  };

  const handleProgramChange = (id) => {
    setProgramId(id);
    setQuotaType("");
  };

  const getQuotaStats = (quota, type) => {
    if (!quota || !type) return { total: 0, filled: 0, available: 0 };

    const total = quota[type] || 0;
    const filled =
      quota[`filled${type.charAt(0).toUpperCase() + type.slice(1)}`] || 0;

    return {
      total,
      filled,
      available: total - filled,
    };
  };

  const quotaStats = getQuotaStats(selectedQuota, quotaType);
  const availableSeats = quotaStats.available;

  const handleAllotSeat = async () => {
    if (!applicant || !programId || !quotaType) return;
    if (availableSeats <= 0) {
      alert("No seats available in this quota!");
      return;
    }
    const result = await allotSeat(applicant._id, programId, quotaType);
    if (result.success) {
      alert("Seat allotted successfully!");
      onClose();
    } else {
      alert(`Error: ${result.error}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-background/70 flex items-center justify-center">
      <div className="bg-card border border-border p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Allot Seat</h2>

        <select
          value={institutionId}
          onChange={(e) => handleInstitutionChange(e.target.value)}
          className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body mb-3"
        >
          <option value="">Select Institution</option>
          {institutions.map((inst) => (
            <option key={inst._id} value={inst._id}>
              {inst.name}
            </option>
          ))}
        </select>

        {institutionId && (
          <select
            value={campusId}
            onChange={(e) => handleCampusChange(e.target.value)}
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body mb-3"
          >
            <option value="">Select Campus</option>
            {filteredCampuses.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        )}

        {campusId && (
          <select
            value={departmentId}
            onChange={(e) => handleDepartmentChange(e.target.value)}
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body mb-3"
          >
            <option value="">Select Department</option>
            {filteredDepartments.map((d) => (
              <option key={d._id} value={d._id}>
                {d.name}
              </option>
            ))}
          </select>
        )}

        {departmentId && (
          <select
            value={programId}
            onChange={(e) => handleProgramChange(e.target.value)}
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body mb-3"
          >
            <option value="">Select Program</option>
            {filteredPrograms.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>
        )}

        {programId && isGovernment && (
          <select
            value={quotaType}
            onChange={(e) => setQuotaType(e.target.value)}
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body mb-3"
          >
            <option value="">Select Quota Type</option>
            <option value="kcet">KCET</option>
            <option value="comedk">COMEDK</option>
          </select>
        )}

        {programId && !isGovernment && (
          <div className="mb-3 text-sm font-medium text-gray-700">
            Quota Type: <strong>Management</strong>
          </div>
        )}

        {quotaType && selectedQuota && (
          <div className="mb-3 text-sm">
            <div
              className={`font-semibold ${
                availableSeats > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              Available Seats: <strong>{availableSeats}</strong>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-base cursor-pointer">
            Cancel
          </button>
          <button
            onClick={handleAllotSeat}
            disabled={!quotaType || availableSeats <= 0}
            className="px-4 py-2 bg-brand text-white rounded-base cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm Allotment
          </button>
        </div>
      </div>
    </div>
  );
}
