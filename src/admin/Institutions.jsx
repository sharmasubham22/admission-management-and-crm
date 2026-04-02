import React, { useContext, useState } from "react";
import { Landmark } from "lucide-react";
import { AppContextAPI } from "../context/AppContext";

export default function Institutions({ onSelect }) {
  const { institutions, loading, addInstitution } = useContext(AppContextAPI);
  const [name, setName] = useState("");

  const handleAddInstitution = async (e) => {
     e.preventDefault();
     const result = await addInstitution({name});
     if (result.success) {
       setName("");
     }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Institutions</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter institution name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-border px-3 py-2 rounded-base"
        />

        <button
          onClick={handleAddInstitution}
          disabled={loading}
          className="bg-brand hover:bg-brand-strong cursor-pointer text-white px-4 py-2 rounded-base"
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {institutions.length === 0 ? (
          <p className="text-gray-500">No institutions found</p>
        ) : (
          institutions.map((inst) => (
            <button
              key={inst._id}
              onClick={() => onSelect(inst)}
              className="bg-card block max-w-sm p-4 border border-default rounded-base shadow-xs cursor-pointer hover:shadow-lg transition-shadow text-left"
            >
              <Landmark className="text-brand" />
              <h1 className="my-2 text-2xl font-semibold tracking-tight text-heading">
                {inst.name}
              </h1>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
