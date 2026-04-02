import React, { useContext, useState, useMemo } from "react";
import { AppContextAPI } from "../context/AppContext";

export default function Quotas({ program, onBack }) {
  const { quotas, addQuota } = useContext(AppContextAPI);

  const [showAddModal, setShowAddModal] = useState(false);
  const [kcet, setKcet] = useState("");
  const [comedk, setComedk] = useState("");
  const [management, setManagement] = useState("");
  const [filledKcet, setFilledKcet] = useState(0);
  const [filledComedk, setFilledComedk] = useState(0);
  const [filledManagement, setFilledManagement] = useState(0);

  const programQuotas = useMemo(() => {
    return quotas.filter((q) => q.programId?._id === program._id);
  }, [quotas, program]);

  const quotaExists = programQuotas.length > 0;

  const kcetNum = Number(kcet || 0);
  const comedkNum = Number(comedk || 0);
  const managementNum = Number(management || 0);

  const quotaSum = kcetNum + comedkNum + managementNum;
  const intake = Number(program.intake || 0);

  const isValid = quotaSum === intake;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await addQuota({
      programId: program._id,
      kcet: kcetNum,
      filledKcet,
      comedk: comedkNum,
      filledComedk,
      management: managementNum,
      filledManagement,
      totalSeats: intake,
    });

    if (result.success) {
      setKcet("");
      setComedk("");
      setManagement("");
      setShowAddModal(false);
      setFilledKcet(0);
      setFilledComedk(0);
      setFilledManagement(0);
    }
  };

  return (
    <div>
      <button onClick={onBack} className="mb-4 px-3 py-1 bg-gray-200 rounded-base">
        ← Back
      </button>
      <h1 className="text-3xl font-bold mb-4">Quotas - {program.name}</h1>

      {quotaExists && (
        <div className="mb-4 p-4 border rounded-base bg-gray-100">
          <h2 className="font-semibold mb-2">Existing Quota</h2>
          <p>
            <strong>KCET:</strong> {programQuotas[0].kcet}
          </p>
          <p>
            <strong>COMEDK:</strong> {programQuotas[0].comedk}
          </p>
          <p>
            <strong>Management:</strong> {programQuotas[0].management}
          </p>
        </div>
      )}

      <button
        onClick={() => setShowAddModal(true)}
        disabled={quotaExists}
        className={`mb-4 px-4 py-2 rounded-base text-white 
          ${
            quotaExists
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-brand hover:bg-brand-strong"
          }
        `}
      >
        {quotaExists ? "Quota Already Added" : "Add Quota"}
      </button>

      {/* Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-background/70 flex items-center justify-center">
          <div className="bg-card border rounded-lg w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">
              Add Quotas for {program.name}
            </h2>

            <form onSubmit={handleSubmit}>
              <p className="mb-3">
                Total Intake: <strong>{intake}</strong>
              </p>

              <input
                type="number"
                placeholder="KCET"
                className="w-full p-2 border rounded-base mb-3"
                value={kcet}
                onChange={(e) => setKcet(e.target.value)}
                required
              />

              <input
                type="number"
                placeholder="COMEDK"
                className="w-full p-2 border rounded-base mb-3"
                value={comedk}
                onChange={(e) => setComedk(e.target.value)}
                required
              />

              <input
                type="number"
                placeholder="Management"
                className="w-full p-2 border rounded-base mb-3"
                value={management}
                onChange={(e) => setManagement(e.target.value)}
                required
              />

              {/* Validation */}
              <p
                className={`mb-3 ${
                  isValid ? "text-green-600" : "text-red-600"
                }`}
              >
                {isValid
                  ? "Quota matches intake ✅"
                  : "Quota must equal intake ❌"}
              </p>

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
                  disabled={!isValid}
                  className="px-4 py-2 bg-brand text-white rounded-base disabled:opacity-50"
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
        {programQuotas.length === 0 ? (
          <p className="text-gray-500">No quotas found</p>
        ) : (
          ''
        )}
      </ul>
    </div>
  );
}
