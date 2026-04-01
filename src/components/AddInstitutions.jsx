import React, { useState } from 'react';
import axios from 'axios';

export default function AddInstitutions({ onClose, onSuccess }) {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/admin/add-institutions', { name });
      onSuccess(); // Refresh the list
      onClose(); // Close modal after successful submission
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-background/70 flex items-center justify-center">
      <div className="bg-card border border-border p-4 md:p-6 rounded-lg w-96">
        <h2 className="text-text-primary text-2xl pb-4 border-b border-border font-body">
          Add Institution
        </h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label className="block text-text-primary mb-2">Institution Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-border rounded"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-brand text-white rounded hover:bg-brand-strong"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
