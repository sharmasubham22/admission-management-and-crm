import React, { useEffect, useState } from "react";
import axios from "axios";
import { Landmark } from "lucide-react";

export default function Institutions({ onSelect }) {
  const [institutions, setInstitutions] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔄 Fetch institutions
  const fetchInstitutions = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/admin/institutions",
      );
      setInstitutions(res.data);
    } catch (err) {
      console.error("Error fetching institutions:", err);
    }
  };

  useEffect(() => {
    fetchInstitutions();
  }, []);

  // ➕ Add institution
  const handleAddInstitution = async () => {
    if (!name.trim()) return;

    try {
      setLoading(true);
      await axios.post("http://localhost:3000/api/admin/add-institutions", {name});
      setName("");
      fetchInstitutions(); // refresh list
    } catch (err) {
      console.error("Error adding institution:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <h1 className="text-2xl font-bold mb-4">Institutions</h1>

      {/* ➕ Add Form */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter institution name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />

        <button
          onClick={handleAddInstitution}
          disabled={loading}
          className="bg-brand hover:bg-brand-strong cursor-pointer text-white px-4 py-2 rounded-base"
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </div>

      {/* 📋 List */}
      <div className="space-y-3">
        {institutions.length === 0 ? (
          <p className="text-gray-500">No institutions found</p>
        ) : (
          institutions.map((inst) => (
            <button
              key={inst._id}
              onClick={() => onSelect(inst)} // 🔥 IMPORTANT
              className="flex items-center gap-3 border p-4 rounded w-full hover:bg-gray-100 transition"
            >
              <Landmark />
              <span className="font-medium">{inst.name}</span>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
