import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContextAPI } from '../../context/AppContext';
import { SquareUserRound } from 'lucide-react';

export default function AdmissionHome() {
  const { applicants } = useContext(AppContextAPI);
  const nav = useNavigate();
  
  return (
    <div className="max-w-5xl mx-auto my-10 p-4 md:p-8">
      <h1 className="text-2xl font-bold">Applicants</h1>
      <button
        className="bg-brand text-white px-4 py-2 rounded-base my-5"
        onClick={() => nav("/add-applicant")}
      >
        Add Applicants
      </button>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {applicants.length === 0 ? (
          <p className="text-gray-500">No applicants found</p>
        ) : (
          applicants.map((app) => (
            app._id ? (
              <button
                key={app._id}
                onClick={() => nav(`/applicant/${app._id}`)}
                className="flex items-center bg-card max-w-sm p-6 border border-default rounded-base shadow-xs hover:shadow-lg transition-shadow text-left cursor-pointer"
              >
                <SquareUserRound className="text-brand"/>
                <span className="my-auto text-2xl font-semibold tracking-tight text-heading ml-3">
                  {app.name}
                </span>
              </button>
            ) : null
          ))
        )}
      </div>
    </div>
  );
}
